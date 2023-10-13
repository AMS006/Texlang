import { filesize } from 'filesize'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { deleteObject, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

import { app } from '../../firebase';
import { setClearFile, setFilesData } from '../../redux/reducers/file';
import axios from 'axios';

const UploadFiles = () => {

    const fileRef = useRef();
    const [files, setFiles] = useState([]);
    const [currentFileIndex, setCurrentFileIndex] = useState(0);
    const [progressFiles, setProgressFiles] = useState({});
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [canceledUpload, setCanceledUpload] = useState({});
    const [uploadTaskMap, setUploadTaskMap] = useState({});
    const [uploadedFilesData, setUploadedFilesData] = useState([])
    const [fileSize, setFileSize] = useState({})
    const [fileRemoved, setFileRemoved] = useState(false)
    const [inProgress, setInProgress] = useState(false)

    const currFileIndexRef = useRef(currentFileIndex);
    const { user } = useSelector((state) => state.user)

    const handleFileCheck = async(newFiles) => {
        const newUpdatedFiles = [];
        for (let i = 0; i < newFiles.length; i++) {
            if (uploadedFiles[newFiles[i].name] || canceledUpload[newFiles[i].name]) {
                continue;
            }
            else {
                let isFound = false;
                for (let j = 0; j < files.length; j++) {
                    if (files[j].name === newFiles[i].name) {
                        isFound = true;
                        break;
                    }
                }
                if (!isFound) {
                    newUpdatedFiles.push(newFiles[i])
                    let fileSize = filesize(newFiles[i].size, { base: 2, standard: "jedec" });
                    setFileSize((prev) => ({ ...prev, [newFiles[i].name]: fileSize }))
                }
            }
        }
        setFiles([...files, ...newUpdatedFiles])
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        setFileRemoved(false)
        handleFileCheck(droppedFiles)
    };

    const handleFileExplorer = () => {
        setFileRemoved(false)
        fileRef.current.click();
    };
    const calculateDuration = (file,type) =>{
        return new Promise((resolve, reject) => {
            const mediaElement = document.createElement(type); // type = 'audio' or 'video'
            mediaElement.src = URL.createObjectURL(file);

            mediaElement.onloadedmetadata = () => {
                const duration = mediaElement.duration;
                URL.revokeObjectURL(mediaElement.src);
                resolve(duration); // Resolve the Promise with the duration.
            };
        });

    }
    const handleUpload = async(file) => {
        const storage = getStorage(app);
        const fileName = file?.name;
        const storageRef = ref(storage, user.id + '_' + fileName);
        const form = new FormData();
            form.append('file', file);
            form.append('name', file.name);
            
            if(file.type.startsWith('video')){
                const value = await calculateDuration(file,'video');
                form.append('value',value)
                console.log(value)
            }
            else if(file.type.startsWith('audio')){
                const value = await calculateDuration(file,'audio')
                form.append('value',value)
            }
        const uploadTask = uploadBytesResumable(storageRef, file);
        setInProgress(true);
        setUploadTaskMap((prevMap) => ({
            ...prevMap,
            [fileName]: uploadTask,
        }));
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressFiles((prev) => {
                    const updatedProgress = { ...prev, [fileName]: Math.round(progress) }
                    return updatedProgress
                });
            },
            (error) => {

            },
            async() => {
                const res = await axios({
                    method: 'POST',
                    url: 'http://localhost:4000/api/work/upload',
                    withCredentials: true,
                    data: form,
                })
               
                setUploadedFilesData((prev) => [...prev,res.data])
                setUploadedFiles({ ...uploadedFiles, [fileName]: true });
                setFileRemoved(false)
                currFileIndexRef.current = currFileIndexRef.current + 1;
                setCurrentFileIndex(currFileIndexRef.current);
                setInProgress(false)
               
            }
        );
    };

    const handleDelteFile = (fileName) => {
        const storage = getStorage(app);
        const fileRef = ref(storage, fileName);

        deleteObject(fileRef)
    }

    const handleRemoveFile = (file) => {
        setFileRemoved(true)
        if (canceledUpload[file.name] || uploadedFiles[file.name]) {
            currFileIndexRef.current = currFileIndexRef.current - 1;
            setCurrentFileIndex(currentFileIndex - 1)
        }
        if (uploadedFiles[file.name]) {
            handleDelteFile(user.id + '_' + file.name)
            const updatedFiles = files.filter((f) => f.name !== file.name);
            const updatedUploadedFiles = { ...uploadedFiles };
            delete updatedUploadedFiles[file.name];
            setFiles(updatedFiles);
            setUploadedFiles(updatedUploadedFiles);
            const updatedProgressFiles = { ...progressFiles };
            delete updatedProgressFiles[file.name];
            setProgressFiles(updatedProgressFiles);
            const updatedUploadedFilesData = uploadedFilesData.filter((f) => f.name !== file.name)
            setUploadedFilesData(updatedUploadedFilesData)
        }
        else {
            const updatedFiles = files.filter((f) => f.name !== file.name);
            setFiles(updatedFiles);
            if (canceledUpload.hasOwnProperty(file.name)) {
                const updatedCanceledFiles = { ...canceledUpload }
                delete updatedCanceledFiles[file.name];
                setCanceledUpload(updatedCanceledFiles)
                const updatedProgressFiles = { ...progressFiles };
                delete updatedProgressFiles[file.name];
                setProgressFiles(updatedProgressFiles);
            }
        }
        
    };

    const handleCancelUpload = (file) => {
        const fileName = file.name;
        setFileRemoved(false)
        setInProgress(false);
        const existingUploadTask = uploadTaskMap[fileName];
        if (existingUploadTask && existingUploadTask._state === 'running') {
            existingUploadTask.cancel();
        }
        const updatedProgressFiles = { ...progressFiles };
        delete updatedProgressFiles[file.name];
        setProgressFiles(updatedProgressFiles);
        setCanceledUpload({ ...canceledUpload, [fileName]: true })
        currFileIndexRef.current = currFileIndexRef.current + 1;
        setCurrentFileIndex(currFileIndexRef.current);
    }

    useEffect(() => {
        if (!inProgress && !fileRemoved && files.length > 0 && currentFileIndex < files.length) {
            handleUpload(files[currentFileIndex]);
        }
    }, [files, currentFileIndex, fileRemoved, inProgress]);

    const dispatch = useDispatch()
    useEffect(() => {
        if (uploadedFilesData ) {
            const updatedFilesData = uploadedFilesData.filter((file) => !canceledUpload.hasOwnProperty(file.name))
            dispatch(setFilesData(updatedFilesData))
        }
    }, [uploadedFilesData, dispatch])
    const { clearFile } = useSelector((state) => state.file)

    useEffect(() => {
        if (clearFile) {
            setFiles([])
            setUploadedFiles({})
            setProgressFiles({})
            setCanceledUpload({})
            setCurrentFileIndex(0)
            setUploadedFilesData([])
            currFileIndexRef.current = 0
            dispatch(setClearFile(false))
        }
    }, [clearFile, dispatch])

    return (
        <div className='flex flex-col w-full gap-2.5'>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleFileExplorer}
                className='flex  gap-2.5 flex-wrap justify-center items-center cursor-pointer overflow-y-auto h-36 w-full border p-1.5  border-dashed rounded border-blue-500'
            >
                <input type='file' multiple name='files' id='' className='hidden' ref={fileRef} onChange={(e) => {  handleFileCheck(e.target.files) }} />
                <h1 className='font-bold text-2xl'>Drag Files or Click</h1>
            </div>
            <div className='flex gap-2.5 flex-wrap items-start justify-start'>
                {files &&
                    files.map((file) => (
                        <div className='flex flex-col justify-between gap-1  border border-black w-36 h-44 p-1 rounded shadow' key={file.name}>
                            <p className='bg-gray-300 p-1 h-1/2 break-words overflow-y-auto custom-scrollbar'>{file.name}</p>
                            {canceledUpload[file.name] ?
                                <div>
                                    <span className='bg-red-500 py-1 px-1.5  text-white rounded text-xs font-semibold'>Upload Canceled</span>
                                </div> :
                                !uploadedFiles[file.name] ? (
                                    <div className='w-full h-2'>
                                        <div className='relative block w-full h-1 bg-gray-400'>
                                            <div className={`bg-blue-500 absolute z-10 h-1 top-0 `} style={{ width: `${progressFiles.hasOwnProperty(file.name) ? progressFiles[file.name] : 0}%` }}></div>
                                            <div className='text-sm pt-0.5'>{progressFiles[file.name] ? progressFiles[file.name] : 0}%</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <span className='bg-green-500 py-1 px-1.5  text-white rounded text-xs font-semibold'>Upload Success</span>
                                    </div>
                                )}
                            <div className='flex flex-col gap-0.5'>
                                <p className='font-semibold px-0.5'>{fileSize[file.name]}</p>
                                {progressFiles[file.name] && (progressFiles[file.name] < 100 || !uploadedFiles[file.name]) ? <button className='bg-blue-500 text-white w-full text-sm font-semibold rounded px-1 py-0.5' onClick={(e) => {
                                    e.preventDefault()
                                    handleCancelUpload(file)
                                }}>Cancel Upload</button> :
                                    <button className='bg-blue-500 text-white w-full text-sm font-semibold rounded px-1 py-0.5' onClick={() => handleRemoveFile(file)}>Remove File</button>}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default UploadFiles;