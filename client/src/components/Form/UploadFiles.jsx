import axios from 'axios';
import { filesize } from 'filesize'
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { deleteObject, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

import { app } from '../../firebase';
import { clearFiles, removeFile, setFilesData } from '../../redux/reducers/file';

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

    const handleFileCheck = async (newFiles) => {
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
    const calculateDuration = (file, type) => {
        return new Promise((resolve, reject) => {
            const mediaElement = document.createElement(type);
            mediaElement.src = URL.createObjectURL(file);

            mediaElement.onloadedmetadata = () => {
                const duration = mediaElement.duration;
                URL.revokeObjectURL(mediaElement.src);
                resolve(duration);
            };
        });
    }
    const handleError = useCallback((file) => {
        setFileRemoved(false)
        setInProgress(false)
        setProgressFiles((prevFiles) => {
            const updatedProgress = { ...prevFiles }
            delete updatedProgress[file.name];
            return updatedProgress

        });
        setCanceledUpload((prev) => ({ ...prev, [file.name]: true }))
        currFileIndexRef.current = currFileIndexRef.current + 1;
        setCurrentFileIndex(currFileIndexRef.current);
        console.log(currFileIndexRef.current)
    }, [])

    const handleUpload = useCallback(async (file) => {
        const storage = getStorage(app);
        const fileName = file?.name;
        const timeStamp = Date.now();
        const storageRef = ref(storage, `${user.companyName.split(' ').join('_')}/${user.id}/${timeStamp}/${fileName}`);
        const form = new FormData();
        form.append('file', file);
        form.append('name', fileName);
        form.append('timeStamp', timeStamp);

        if (file.type.startsWith('video')) {
            const value = await calculateDuration(file, 'video');
            form.append('value', value)
        }
        else if (file.type.startsWith('audio')) {
            const value = await calculateDuration(file, 'audio')
            form.append('value', value)
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
                handleError(file)
            },
            async () => {

                try {
                    const res = await axios({
                        method: 'POST',
                        url: 'http://localhost:4000/api/work/upload',
                        data: form,
                    })

                    setUploadedFilesData((prev) => [...prev, res.data])
                    setUploadedFiles((prev) => ({ ...prev, [fileName]: true }))
                    setFileRemoved(false)
                    currFileIndexRef.current = currFileIndexRef.current + 1;
                    setCurrentFileIndex(currFileIndexRef.current);
                    setInProgress(false)
                } catch (error) {
                    handleError(file)
                }
            }
        );
    }, [user, handleError]);

    const handleDeleteFile = (fileName) => {
        const storage = getStorage(app);
        const fileRef = ref(storage, fileName);

        deleteObject(fileRef)
    }

    const handleRemoveFile = (file) => {
        setFileRemoved(true)
        dispatch(removeFile(file.name))
        if (canceledUpload[file.name] || uploadedFiles[file.name]) {
            currFileIndexRef.current = currFileIndexRef.current - 1;
            setCurrentFileIndex(currentFileIndex - 1)
        }
        if (uploadedFiles[file.name]) {
            const filePath = uploadedFilesData.filter((f) => f.name === file.name)[0].filePath
            handleDeleteFile(filePath)
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
        const existingUploadTask = uploadTaskMap[fileName];
        if (existingUploadTask && existingUploadTask._state === 'running') {
            existingUploadTask.cancel();
        }
    }

    useEffect(() => {
        if (!inProgress && !fileRemoved && files.length > 0 && currentFileIndex < files.length) {
            handleUpload(files[currentFileIndex]);
        }
    }, [files, currentFileIndex, fileRemoved, inProgress, handleUpload]);

    const dispatch = useDispatch()


    useEffect(() => {

        const updatedFilesData = uploadedFilesData.filter((file) => !canceledUpload.hasOwnProperty(file.name))
        dispatch(setFilesData(updatedFilesData))

    }, [uploadedFilesData, dispatch, canceledUpload])
    const { clearFile } = useSelector((state) => state.file)

    useEffect(() => {
        if (clearFile) {
            setFiles([])
            dispatch(clearFiles())
            setUploadedFiles({})
            setProgressFiles({})
            setCanceledUpload({})
            setCurrentFileIndex(0)
            setUploadedFilesData([])
            currFileIndexRef.current = 0

        }
    }, [clearFile, dispatch])

    useEffect(() => {
        dispatch(clearFiles())
    }, [dispatch])

    return (
        <div className='flex flex-col w-full gap-2.5'>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleFileExplorer}
                className='flex  gap-2.5 flex-wrap justify-center items-center cursor-pointer overflow-y-auto h-36 w-full border p-1.5  border-dashed rounded border-blue-500'
            >
                <input type='file' multiple name='files' id='' className='hidden' ref={fileRef} onChange={(e) => { handleFileCheck(e.target.files) }} />
                <h1 className='font-bold text-2xl'>Drag Files or Click</h1>
            </div>
            <div className='flex gap-2.5 flex-wrap items-start justify-start'>
                {files &&
                    files.map((file, idx) => (
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
                                {idx === currentFileIndex ? <button className='bg-blue-500 text-white w-full text-sm font-semibold rounded px-1 py-0.5' onClick={(e) => {
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