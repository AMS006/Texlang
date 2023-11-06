import Select from 'react-select';
import React, { useEffect, useState } from 'react';

import { updateFile } from '../../redux/reducers/file';
import { useDispatch, useSelector } from 'react-redux';
import { contentStyles, contentType } from '../../data/selectOptions';



const SelectContentType = ({ name }) => {
    const { files } = useSelector((state) => state.file)
    const [selectedContent, setSelectedContent] = useState('translation')
    const [file, setFile] = useState({})

    const dispatch = useDispatch();
    useEffect(() => {
        if (files.length > 0) {
            let flleData = files.find((data) => data.name === name)
            setFile(flleData)
        }
    }, [files, name])
    const onChange = (type) => {
        if (file) {
            const updatedFile = { ...file, contentType: type }
            setFile(updatedFile)
            setSelectedContent(type)
            dispatch(updateFile(updatedFile))
        }
    }
    return (
        <Select
            options={contentType}
            value={contentType.find((option) => option.value === selectedContent)}
            onChange={(selectedOption) => onChange(selectedOption.value)}
            styles={contentStyles}

        />
    );
};

export default SelectContentType;
