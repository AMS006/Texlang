import SelectContentType from "./Select/SelectContentType";
import SelectSourceLanguage from "./Select/SelectSourceLanguage";
import SelectTargetLanguage from "./Select/SelectTargetLanguage";
import dayjs from 'dayjs'

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

export const displayTableColumns = [
    {
        Header: 'ID',
        accessor: (row, idx) => idx + 1
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Content Type',
        accessor: 'contentType',
        Cell: ({ row }) => (
            <SelectContentType name={row.original.name} />
        ),
    },
    {
        Header: 'Source Language',
        accessor: 'sourceLanguage',
        Cell: ({ row, }) => (
            <SelectSourceLanguage name={row.original.name} />
        ),
    },
    {
        Header: 'Target Language',
        accessor: 'targetLanguage',
        Cell: ({ row, value }) => (
            <SelectTargetLanguage name={row.original.name} />
        ),
    },
    {
        Header: 'Size',
        accessor: 'size',
    },
    {
        Header: 'Format',
        accessor: 'format',
    },
];
export const projectListTableColumns = [
    {
        Header: 'Sr. No.',
        accessor: (row, idx) => idx + 1
    },
    {
        Header: 'Project Title',
        accessor: 'name',
    },
    {
        Header: 'User Id',
        accessor: 'userId',
    },
    {
        Header: 'Start Date',
        accessor: 'start_date',
        Cell: info => <span className="text-sm">{dayjs(info.data[0].start_date).format("DD/MM/YYYY")}</span>
    },
    {
        Header: 'End Data',
        accessor: 'end_date',
        Cell: info => <span className="text-sm py-1 px-1.5 bg-[#f1c40f] text-white">{dayjs(info.data[0].end_date).format("DD/MM/YYYY")}</span>
    },
    {
        Header:'Status',
        accessor:'status',
        Cell: info => <span className="bg-red-500 py-1 px-1.5 text-sm text-white ">{info.data[0].status}</span>
    }
];
export const contentType = [
    { value: 'translation', label: 'Translation' },
    { value: 'video', label: 'Video(Translation + Editing' },
    { value: 'subtitling', label: 'Subtitling' },
    { value: 'debbing', label: 'Dubbing/Voice-Over' },
    { value: 'brochure', label: 'Brochure' },
    { value: 'banner', label: 'Banner' }
];