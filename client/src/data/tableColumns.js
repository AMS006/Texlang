import dayjs from "dayjs";
import { Link } from "react-router-dom";

import UserEditButton from "../components/admin/UserEditButton";
import StatusFilter from "../components/Common/Filters/StatusFilter";
import EndDateFilter from "../components/Common/Filters/EndDateFilter";
import SelectContentType from "../components/Select/SelectContentType";
import StartDateFilter from "../components/Common/Filters/StartDateFilter";
import UserDeactivateButton from "../components/admin/UserDeactivateButton";
import SelectSourceLanguage from "../components/Select/SelectSourceLanguage";
import SelectTargetLanguage from "../components/Select/SelectTargetLanguage";

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
        Cell: info => <span className={`text-sm py-1 px-1.5 ${info.data[info.row.index]?.status==='Completed'?'bg-blue-500':'bg-yellow-500'} text-white`}>{dayjs(info.value).format("DD/MM/YYYY")}</span>
    },
    {
        Header:'Status',
        accessor:'status',
        Cell: info => <span className={`${info.value==='Completed'?'bg-blue-500':'bg-red-500'} py-1 px-1.5 text-sm text-white `}>{info.value}</span>
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
        Cell: info => <span className={`text-sm py-1 px-1.5 ${info.data[info.row.index]?.status==='Completed'?'bg-blue-500':'bg-yellow-500'} text-white`}>{dayjs(info.value).format("DD/MM/YYYY")}</span>
    },
    {
        Header:'Status',
        accessor:'status',
        Cell: info => <span className={`${info.value==='Completed'?'bg-blue-500':'bg-red-500'} py-1 px-1.5 text-sm text-white `}>{info.value}</span>
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
        Cell: info => <span className={`text-sm py-1 px-1.5 ${info.data[info.row.index]?.status==='Completed'?'bg-blue-500':'bg-yellow-500'} text-white`}>{dayjs(info.value).format("DD/MM/YYYY")}</span>
    },
    {
        Header:'Status',
        accessor:'status',
        Cell: info => <span className={`${info.value==='Completed'?'bg-blue-500':'bg-red-500'} py-1 px-1.5 text-sm text-white `}>{info.value}</span>
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
export const userUsageTable = [
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
        Header: 'E-mail',
        accessor: 'email',
        Cell: (info) => <span >{info.value}</span>
    },
    {
        Header: 'Total Billed Amount(₹)',
        accessor: 'billedAmount',
        Cell: (info) => <span >{Number(info.value).toFixed(2)}</span>
    },
   
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
                {info.value?.map((val,idx) => val.lang + (idx+1<info.value.length?', ':''))}
            </span>
    },
    {
        Header:'Job Type',
        accessor:'contentType',
        Cell: info => <span className='capitalize'>{info.value}</span>
    },
    {
        Header:"Unit",
         Cell:(info)=><span>{info.data[info.row.index].wordCount > 0?'Word/Page Count':"Time"}</span>
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

export const projectDownloadTable = [
    {
        Header:"Target Language",
       
        Cell:(info)=> <span className='capitalize'>{info.data[info.row.index].lang}</span>
    },
    {
        Header:"Download Status",
        accessor:"downloadUrl",
        Cell:(info) => <a href={info.value} className="text-blue-500 hover:underline " download>{info.value && 'Download'}</a>
    }
]

export const invoiceTableColumn = [
     {
        Header: 'Sr. No.',
        accessor: (row, idx) => idx + 1
    },
    {
        Header: 'Department',
        accessor: 'department',
        Cell: (info) => <span>{info.value}</span>
    },
    {
        Header:"Date of Creation",
       accessor:'createdAt',
        Cell:(info)=> <span className='capitalize'>{dayjs(info.value).format('M/DD/YYYY')}</span>
    },
    {
        Header:"Project Name",
        accessor:"name"
    },
    {
        Header:"Created By",
        accessor:'createdBy'
    },
    {
        Header:"Invoices",
        Cell:(info) => <Link to={`/Admin/Invoice/Generate/${info.data[info?.row?.index].id}`} className='text-blue-500 hover:underline'>Generate</Link>
    }
]

export const invoiceFileTableColumn = [
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
        Header:"Service Type",
       accessor:'contentType',
        Cell:(info)=> <span className='capitalize'>{info.value}</span>
    },
    {
        Header:"Amount",
        accessor:"amount"
    }
]

export const taxDetailTableColumn = [
     {
        Header: 'Total Amount',
       
    },
    {
        Header: 'CGST',
       
    },
    {
        Header:"SGST",
      
    },
    {
        Header:"Total After Tax",
    }
]

export const generateReportsTableColumn = [
    {
        Header: 'Sr. No.',
        accessor: (row, idx) => idx + 1,
        Filter: StartDateFilter,
        disableFilters:true
    },
    {
        Header: 'Project Title',
        accessor: 'name',
        Cell: (info) => {
            return <Link className="text-blue-500 hover:underline" to={`/Admin/ProjectDetails/${info.data[info.row.index].id}`}>{info.value}</Link>

        },
        Filter: StartDateFilter,
        disableFilters:true
    },
    {
        Header: 'Customer',
        accessor: 'customer',
         Filter: StartDateFilter,
        disableFilters:true
       
    },
    {
        Header: 'Start Date',
        accessor: 'start_date',
        Cell: (info) => <span className="text-sm">{dayjs(info.value).format("DD/MM/YYYY")}</span>,
        Filter: StartDateFilter,
       
    },
    {
        Header: 'End Data',
        accessor: 'end_date',
        Cell: info => <span className={`text-sm py-1 px-1.5 ${info.data[info.row.index]?.status==='Completed'?'bg-blue-500':'bg-yellow-500'} text-white`}>{dayjs(info.value).format("DD/MM/YYYY")}</span>,
        Filter: EndDateFilter,
       
    },
    {
        Header:'Status',
        accessor:'status',
        Cell: info => <span className={`${info.value==='Completed'?'bg-blue-500':'bg-red-500'} py-1 px-1.5 text-sm text-white `}>{info.value}</span>,
         Filter: StatusFilter,
    }
]