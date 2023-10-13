import dayjs from 'dayjs'
import { Link } from "react-router-dom";
import SelectContentType from "./Select/SelectContentType";
import SelectSourceLanguage from "./Select/SelectSourceLanguage";
import SelectTargetLanguage from "./Select/SelectTargetLanguage";
import UserEditButton from './admin/UserEditButton';
import UserDeactivateButton from './admin/UserDeactivateButton';

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
        Cell: ({ row }) => (
           <SelectSourceLanguage name={row.original.name} />
        ),
    },
    {
        Header: 'Target Language',
        accessor: 'targetLanguage',
        Cell: ({ row }) => (
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
        Cell:(info) => <Link className="text-blue-500 hover:underline" to={`/Enterprise/EnterpriseFileDownLoad/${info.data[info.row.index].id}`}>{info.value}</Link>
    },
    {
        Header: 'User Id',
        accessor: 'userId',
    },
    {
        Header: 'Start Date',
        accessor: 'start_date',
        Cell: (info) => <span className="text-sm">{dayjs(info.value).format("DD/MM/YYYY")}</span>
    },
    {
        Header: 'End Data',
        accessor: 'end_date',
        Cell: info => <span className="text-sm py-1 px-1.5 bg-[#f1c40f] text-white">{dayjs(info.value).format("DD/MM/YYYY")}</span>
    },
    {
        Header:'Status',
        accessor:'status',
        Cell: info => <span className="bg-red-500 py-1 px-1.5 text-sm text-white ">{info.value}</span>
    }
];
export const companyProjectListTableColumns = [
    {
        Header: 'Sr. No.',
        accessor: (row, idx) => idx + 1
    },
    {
        Header: 'Project Title',
        accessor: 'name',
        Cell: (info) => {
            return <Link className="text-blue-500 hover:underline" to={`/Admin/ProjectDetails/${info.data[info.row.index].id}`}>{info.value}</Link>
        }
    },
    {
        Header: 'Customer',
        accessor: 'customer',
    },
    {
        Header: 'Start Date',
        accessor: 'start_date',
        Cell: (info) => <span className="text-sm">{dayjs(info.value).format("DD/MM/YYYY")}</span>
    },
    {
        Header: 'End Data',
        accessor: 'end_date',
        Cell: info => <span className="text-sm py-1 px-1.5 bg-[#f1c40f] text-white">{dayjs(info.value).format("DD/MM/YYYY")}</span>
    },
    {
        Header:'Status',
        accessor:'status',
        Cell: info => <span className="bg-red-500 py-1 px-1.5 text-sm text-white ">{info.value}</span>
    }
]
export const latestProjectColumn = [
    {
        Header: 'Sr. No.',
        accessor: (row, idx) => idx + 1
    },
    {
        Header: 'Project Title',
        accessor: 'name',
        Cell:(info) => <Link className="text-blue-500 hover:underline" to={`/Admin/ProjectDetails/${info.data[info.row.index].id}`}>{info.value}</Link>
    },
    {
        Header: 'Start Date',
        accessor: 'start_date',
        Cell: (info) => <span className="text-sm">{dayjs(info.value).format("DD/MM/YYYY")}</span>
    },
    {
        Header: 'End Data',
        accessor: 'end_date',
        Cell: info => <span className="text-sm py-1 px-1.5 bg-[#f1c40f] text-white">{dayjs(info.value).format("DD/MM/YYYY")}</span>
    },
    {
        Header:'Status',
        accessor:'status',
        Cell: info => <span className="bg-red-500 py-1 px-1.5 text-sm text-white ">{info.value}</span>
    }
]

export const manageUserTable = [
    {
        Header: 'Sr. No.',
        accessor: (row, idx) => idx + 1
    },
    {
        Header: 'User name',
        Cell:(info) =>(
            <span>{info.row.original?.firstName + " " + info.row.original?.lastName}</span>
        )
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: (info) => <span className="text-sm">{info.value?'Active':"Deactivated"}</span>
    },
    {
        Header: 'Action',
        Cell: info => {
            return (
                <div className='flex gap-1.5 items-center justify-center'>
                    <UserEditButton user={info.row.original} />
                    <span> | </span>
                    <UserDeactivateButton user={info.row.original} />
                </div>
            )
        }
    }
]
export const workTableColumn = [
    {
        Header: 'Sr. No.',
        accessor: (row, idx) => idx + 1
    },
    {
        Header: 'File Name',
        accessor: 'name',
        Cell: (info) => <span>{info.value}</span>
    },
    {
        Header: 'Source Language',
        accessor: 'sourceLanguage',
        Cell: (info) => <span className="capitalize">{info.value}</span>
    },
    {
        Header: 'Target Language',
        accessor: 'targetLanguage',
        Cell: info => 
            <span className='capitalize'>
                {info.value.join(', ')}
            </span>
    },
    {
        Header:'Job Type',
        accessor:'contentType',
        Cell: info => <span className='capitalize'>{info.value}</span>
    },
    {
        Header:"Unit",
         Cell:()=><span>Word/Page count</span>
    },
    {
        Header:"Value",
        accessor:'value',
        Cell:(info)=><span>{info.value > 0 ? info.value + 's':''}</span>
    },
    {
        Header:"Word Count",
        accessor:'wordCount',
        Cell:(info) =><span>{info.value > 0 ? info.value:''}</span>
    }
]