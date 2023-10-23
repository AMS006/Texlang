export const contentType = [
    { value: 'translation', label: 'Translation' },
    { value: 'video', label: 'Video(Translation + Editing)' },
    { value: 'subtitling', label: 'Subtitling' },
    { value: 'dubbing', label: 'Dubbing/Voice-Over' },
    { value: 'brochure', label: 'Brochure' },
    { value: 'banner', label: 'Banner' }
];
export const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'hindi', label: 'Hindi'},
    { value: 'marathi', label:'Marathi'},
    { value: 'urdu', label:'Urdu'},
    { value: 'malyalam', label: 'Malyalam'}
];

export const recordsOptions = [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 4, value: 4 },
        { label: 10, value: 10 },
        { label: 50, value: 50 },
    ]

export const languageStyles = {
    control: (provided) => ({
        ...provided,
    }),
    menu: (provided) => ({
        ...provided,
        position: 'absolute',
        top: -320, 
        zIndex: 1000,
        
    }),
};
export const contentStyles = {
    control: (provided) => ({
        ...provided,
    }),
    menu: (provided) => ({
        ...provided,
        position: 'absolute',
        top: -280, 
        zIndex: 1000,
    }),
};