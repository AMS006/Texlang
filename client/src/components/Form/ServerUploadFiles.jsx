import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setFilesData } from '../../redux/reducers/file';

const ServerUploadFiles = () => {

    const fileRef = useRef();
    const [files, setFiles] = useState([]);
    const [currentFileIndex, setCurrentFileIndex] = useState(0);
    const [uploadedFilesData,setUploadedFilesData] = useState([]);
    const [uploadedFiles,setUploadedFiles] = useState({})
    const [progress,setProgress] = useState(0)
    const [fileRemoved,setFileRemoved] = useState(false)
    const [canceledFiles,setCanceledFiles] = useState({})
    const [failedFiles,setFailedFiles] = useState({})

    const handleFileCheck = async(newFiles) => {
        const newUpdatedFiles = [];
        setFileRemoved(false)
        for (let i = 0; i < newFiles.length; i++) {
            let isFound = false;
            for (let j = 0; j < files.length; j++) {
                if (files[j].name === newFiles[i].name) {
                    isFound = true;
                    break;
                }
            }
            if (!isFound)
                newUpdatedFiles.push(newFiles[i])

        }
        setFiles([...files, ...newUpdatedFiles])

    }

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        handleFileCheck(droppedFiles)
    };

    const handleFileExplorer = () => {
        fileRef.current.click();
    };
    const { CancelToken, isCancel } = axios;
   
    const dispatch = useDispatch()
    const [cancelSource, setCancelSource] = useState(null);
    const calculateDuration = (file,type) =>{
        const mediaElement = document.createElement(type); // type = audio,video
        mediaElement.src = URL.createObjectURL(file);
         mediaElement.onloadedmetadata = () => {
        const duration = mediaElement.duration; 
      
        URL.revokeObjectURL(mediaElement.src);
        return duration;

        };

    }
    const handleUpload = async (file) => {
        const form = new FormData();
        form.append('file', file);
        form.append('name', file.name);
        
        if(file.type.startsWith('video')){
            const value = calculateDuration(file,'video');
            form.append('value',value)
        }
        else if(file.type.startsWith('audio')){
            const value = calculateDuration(file,'audio')
            form.append('value',value)
        }
        const source = axios.CancelToken.source();
        setCancelSource(source);
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:4000/api/work/upload',
                withCredentials: true,
                data: form,
                onUploadProgress: (progressEvent) => {
                if (source.token.reason) {
                    
                } else {
                    const percentCompleted = (progressEvent.loaded / progressEvent.total) * 100;
                    setProgress(Math.ceil(percentCompleted));
                }
                },
                cancelToken: source.token,
            });
            setUploadedFilesData((prev) => [...prev,res.data]);
            setUploadedFiles((prev) => ({...prev,[files[currentFileIndex].name]:true}))
            setProgress(0);
            setCurrentFileIndex((prev) => prev + 1);
            setFileRemoved(false)
        } catch (error) {
            if (axios.isCancel(error)) {
                const fileName = files[currentFileIndex].name
                setCanceledFiles((prev) => ({...prev,[fileName]:true}))
                setProgress(0)
                setCurrentFileIndex((prev) => prev+1)
                setFileRemoved(false)
            } else {
                setFailedFiles((prev) => ({...prev,[files[currentFileIndex].name]:true}))
                setProgress(0)
                setCurrentFileIndex((prev) => prev+1)
                setFileRemoved(false);
                
            }
        }
    };
    const cancelUpload = (e) => {
        if (cancelSource) {
            cancelSource.cancel('Request Canceled By User');
        }
    };
    const handleFileRemove = (name) =>{
        setFileRemoved(true)
        if(uploadedFiles.hasOwnProperty(name)){
            setCurrentFileIndex((prev) => prev - 1)
            const updatedUploadedFiles = {...uploadedFiles}
            delete updatedUploadedFiles[name]
            setUploadedFiles(updatedUploadedFiles)
            const updatedUploadedFilesData = uploadedFilesData.filter((file) => file.name !== name)
            setUploadedFilesData(updatedUploadedFilesData)
        }
        else if(canceledFiles.hasOwnProperty(name)){
            setCurrentFileIndex((prev) => prev - 1)
            const updatedCanceledFiles = {...canceledFiles}
            delete updatedCanceledFiles[name]
            setCanceledFiles(updatedCanceledFiles)
        }
         else if(failedFiles.hasOwnProperty(name)){
            setCurrentFileIndex((prev) => prev - 1)
            const updatedFailedFiles = {...failedFiles}
            delete updatedFailedFiles[name]
            setCanceledFiles(updatedFailedFiles)
        }
        
        const updatedFiles = files.filter((file) => file.name !== name)
        setFiles(updatedFiles)
    }
    useEffect(() => {
        if (!fileRemoved && currentFileIndex < files.length) {
            handleUpload(files[currentFileIndex]);
        }
    }, [files, currentFileIndex]);

    useEffect(() =>{
        
        if(uploadedFilesData){
            
            dispatch(setFilesData(uploadedFilesData))
        }
    },[uploadedFilesData])
    return (
        <div className='flex flex-col w-full gap-2.5'>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleFileExplorer}
                className='flex  gap-2.5 flex-wrap justify-center items-center cursor-pointer overflow-y-auto h-36 w-full border p-1.5  border-dashed rounded border-blue-500'
            >
                <input type='file' multiple name='files' id='' className='hidden' ref={fileRef} onChange={(e) => {handleFileCheck(e.target.files) }} />
                <h1 className='font-bold text-2xl'>Drag Files or Click</h1>
            </div>
            <div className='flex gap-2.5 flex-wrap items-start justify-start'>
                {files.map((file,idx) =>(
                     <div className='flex flex-col justify-between gap-1  border border-black w-36 h-44 p-1 rounded shadow' key={file.name}>
                        <p className='bg-gray-300 p-1 h-1/2 break-words overflow-y-auto custom-scrollbar'>{file.name}</p>
                        {idx === currentFileIndex?
                            <div className='relative block w-full h-1 bg-gray-400'>
                                <div className={`bg-blue-500 absolute z-10 h-1 top-0 `} style={{ width: `${progress}%` }}></div>
                                <div className='text-sm pt-0.5'>{progress}%</div>
                            </div>:
                            <div>
                                {currentFileIndex > idx ?
                                canceledFiles[file.name]?
                                <span className='bg-red-500 py-1 px-1.5  text-white rounded text-xs font-semibold'>Upload Canceled</span>:
                                failedFiles[file.name]?
                                <span className='bg-red-500 py-1 px-1.5  text-white rounded text-xs font-semibold'>Upload Failed</span>:
                               <span className='bg-green-500 py-1 px-1.5  text-white rounded text-xs font-semibold'>Upload Success</span>:
                                <span>In Queue</span>}
                            </div>
                        }
                        <div>
                            {idx === currentFileIndex?
                                <div className='bg-blue-500 text-white w-full text-sm font-semibold rounded px-1 py-0.5 cursor-pointer text-center' onClick={cancelUpload}>Cancel Upload</div>:
                                <div className='bg-blue-500 text-white w-full text-sm font-semibold rounded px-1 py-0.5 cursor-pointer text-center' onClick={() =>handleFileRemove(file.name)}>Remove File</div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServerUploadFiles;


