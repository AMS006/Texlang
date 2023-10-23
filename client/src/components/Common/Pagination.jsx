import React from 'react'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'

const Pagination = (
  { previousPage, nextPage, canNextPage, canPreviousPage, pageLen, dataLen, pageCount, pageIndex, gotoPage }
) => {
  const pages = [];
  if (pageCount <= 4) {
    for (let i = 0; i < pageCount; i++) {
      pages.push(i);
    }
  } else {
    if (pageIndex < 2) {
      for (let i = 0; i < 3; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(pageCount - 1);
    } else if (pageIndex >= 2 && pageIndex < (pageCount - 2)) {
      pages.push(0);
      pages.push('...');
      for (let i = pageIndex - 1; i < pageIndex + 2; i++) {
        pages.push(i);
      }
      pages.push('...')
      pages.push(pageCount - 1)
    } else {
      pages.push(0);
      pages.push('...');
      for (let i = pageIndex - 1; i < pageCount; i++) {
        pages.push(i);
      }

    }
  }
  return (
    <div className={`flex items-center justify-between my-2.5`}>
      <div>
        <span>Showing {pageLen} out of {dataLen} records</span>
      </div>
      <div className='flex justify-end items-center mt-4 gap-1.5'>
        <button onClick={() => previousPage()} className={`border border-gray-300 rounded font-semibold p-2.5 ${!canPreviousPage ? 'cursor-not-allowed' : 'hover:bg-gray-100'}`} disabled={!canPreviousPage}>
          <AiOutlineLeft />
        </button>
        {pages.map((page, index) => (
          <button
            key={page}
            onClick={() => {
              if (page !== '...') {
                gotoPage(page);
              }
            }}
            disabled={page === '...'}
            className={`px-3 py-1.5 border border-gray-300 rounded ${pageIndex === page ? 'bg-blue-500 border text-white' : page !== '...' ? 'hover:bg-gray-100' : ''}`}
          >
            {page !== '...' ? page + 1 : page}
          </button>
        ))}
        <button onClick={() => nextPage()} className={`border border-gray-300 rounded font-semibold p-2.5 ${!canNextPage ? 'cursor-not-allowed' : 'hover:bg-gray-100'}`} disabled={!canNextPage}>
          <AiOutlineRight />
        </button>
      </div>
    </div>
  )
}

export default Pagination
