import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateFile } from '../../redux/reducers/file';
import { languageOptions, languageStyles } from '../data';


const SelectTargetLanguage = ({ name }) => {
    const { files } = useSelector((state) => state.file)
    const [selectedLanguage, setSelectedLanguage] = useState([])
    const [file, setFile] = useState({})
    

    const dispatch = useDispatch();
    useEffect(() => {
        if (files.length > 0) {
            let flleData = files.find((data) => data.name === name)
            setFile(flleData)
        }
    }, [files,name])
    const onChange = (lang) => {
        if (file) {
           let languages = []
           lang.map((val) =>{
            languages.push(val.value)
           })
           let updatedFile = {...file,targetLanguage:languages}
            setFile(updatedFile)
            setSelectedLanguage((prev) => [...prev,lang])
            dispatch(updateFile(updatedFile))
        }
    }
    return (
        <Select
            options={languageOptions}
            // value={languageOptions.find((option) => option.value === selectedLanguage)}
            onChange={(selectedOption) => onChange(selectedOption)}
            styles={languageStyles}
            isMulti={true}
        />
    );
};

export default SelectTargetLanguage;
