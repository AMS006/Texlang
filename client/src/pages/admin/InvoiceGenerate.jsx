import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../layout'
import megdapLogo from '../../assets/megdapLogo.svg'
import { getInvoiceWork } from '../../redux/actions/admin/work'
import TaxDetailTable from '../../components/admin/Table/TaxDetailsTable'
import InvoiceFileTable from '../../components/admin/Table/InvoiceFileTable'

const InvoiceGenerate = () => {
  const { user } = useSelector((state) => state.user)
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (id)
      dispatch(getInvoiceWork(id))
  }, [dispatch, id])
  return (
    <div className='px-6 py-8 font-sans'>
      <div className='flex justify-between items-center py-4'>
        <div>
          <img src={megdapLogo} alt="Megdap" className='max-w-[300px]' />
        </div>
        <div className='flex flex-col items-start'>
          <div className='flex items-center gap-1 font-semibold'>
            <span>Invoice No.</span>
            <span>#TEX38u89</span>
          </div>
          <div className='flex items-center gap-1 font-semibold'>
            <span>User Id :</span>
            <span>{user.email}</span>
          </div>
          <div className='flex items-center gap-1 font-semibold'>
            <span>Department :</span>
            <span>Hr</span>
          </div>
        </div>
      </div>
      <hr />
      <div className='flex justify-between items-start py-4 text-sm'>
        <div className='flex flex-col gap-1.5'>
          <h3 className='font-semibold'>Company Details :</h3>
          <ul>
            <li className='font-semibold'>Megdap Innovation Labs Pvt. Ltd.</li>
            <li>201 Polekar heights bhau patil road</li>
            <li>Near Pune IT Park Maharashtra , 411020</li>
            <li>
              <span className='font-semibold'>GSTIN/UIN : </span>
              <span>3i8jjioj3j</span>
            </li>
            <li>
              <span className='font-semibold'>CIN : </span>
              <span>28ijklmi0jrkmrf</span>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-1.5'>
          <h3 className='font-semibold'>Customer Details :</h3>
          <ul>
            <li>Megdap Test</li>
            <li>xx, xx</li>
            <li>Pune Maharashtra, 411020</li>
            <li>
              <span className='font-semibold'>GSTIN/UIN :</span>
              <span>38789</span>
            </li>
            <li>
              <span className='font-semibold'>PAN/IT No. : </span>
              <span>nohklojrmn</span>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-1.5'>
          <h3 className='font-semibold'>Company Bank Details :</h3>
          <ul>
            <li>
              <span className='font-semibold'>Bank Name : </span>
              <span>XYZ Bank</span>
            </li>
            <li>
              <span className='font-semibold'>A/c No. : </span>
              <span>28987974897</span>
            </li>
            <li>
              <span className='font-semibold'>Branch & IFSC code : </span>
              <span>XYZe7r7u7</span>
            </li>
            <li>
              <span className='font-semibold'>Company PAN : </span>
              <span>jojljjkjlkj</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <InvoiceFileTable />
      </div>
      <div className='flex flex-col gap-2.5'>
        <div className='w-full'>
          <h3 className='font-semibold'>Tax Details</h3>
          <TaxDetailTable />
        </div>
        <div className='flex flex-col text-sm'>
          <h3 className='font-semibold'>Declaration</h3>
          <p>We declare that this invoice show actual price of the goods described and that all particulars are true and correct</p>
          <h4 className='font-semibold uppercase'>for megdap innovation labs private limited</h4>
        </div>
      </div>
    </div>
  )
}

export default Layout(InvoiceGenerate)
