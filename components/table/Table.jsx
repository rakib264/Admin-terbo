'use client';

import { useState } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { GrFilter } from 'react-icons/gr';

const MyTable = ({ entities, columns }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const [entitiesPerPage, setEntitiesPerPage] = useState(5);
   const [search, setSearch] = useState('');
   const [sortField, setSortField] = useState('');
   const [sortDirection, setSortDirection] = useState('asc');

   // Logic for displaying current entities
   const indexOfLastEntity = currentPage * entitiesPerPage;
   const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;
   const currentEntities = entities.slice(
      indexOfFirstEntity,
      indexOfLastEntity
   );

   const searchEntities = currentEntities.filter(entity =>
      entity.name.toLowerCase().includes(search.toLowerCase())
   );

   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(entities.length / entitiesPerPage); i++) {
      pageNumbers.push(i);
   }

   const handleSort = field => {
      console.log('Clicked', field);
      if (sortField === field) {
         // Reverse the sort direction if the same field is clicked again
         setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
         setSortField(field);
         setSortDirection('asc');
      }
   };

   const sortedData = [...searchEntities].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
   });

   //console.log('sortedData', sortedData);

   const handleClick = event => {
      setCurrentPage(Number(event.target.id));
   };

   const handlePreviousBtn = () => {
      setCurrentPage(prevPage => Number(prevPage - 1));
   };

   const handleNextBtn = () => {
      setCurrentPage(prevPage => Number(prevPage + 1));
   };

   const handleSetEntitiesPerPage = e => {
      setEntitiesPerPage(Number(e.target.value));
   };

   //console.log(pageNumbers.length);

   return (
      <div className='container mx-auto w-full pt-6'>
         <div className='flex flex-col gap-2 bg-gray-100 px-12'>
            {/* Search Input */}

            <div className='w-full flex justify-end pr-2'>
               <div className='w-2/5'>
                  <div className='relative h-11 w-full min-w-[200px]'>
                     <input
                        className='peer h-full w-full rounded-md border-0 shadow-sm border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                        placeholder=' '
                        type='text'
                        onChange={e => setSearch(e.target.value)}
                     />
                     <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Search
                     </label>
                     <button
                        className='absolute top-0 right-0 bottom-0 z-[2] rounded-r border-l-2 border-l-gray-200 peer-focus:border-l-cyan-500 hover:bg-cyan-500 focus:bg-cyan-500 focus:text-white px-4 py-2 text-xs font-medium uppercase text-gray-500 peer-focus:text-cyan-500 transition duration-150 ease-in-out hover:text-white hover:bg-opacity-1 focus:outline-none focus:ring-0'
                        type='button'
                        id='button-addon3'
                        data-te-ripple-init
                     >
                        <BsSearch size={24} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Search Input */}

            <div
               className={`overflow-x-scroll overflow-y-scroll w-full
              ${entitiesPerPage > 5 ? 'max-h-[40rem]' : 'h-auto'}
             bg-white shadow overflow-scroll border-b sm:rounded-lg mt-6`}
            >
               <table className='w-full min-w-max table-auto text-left'>
                  <thead>
                     <tr>
                        {columns.map(column => (
                           <th
                              onClick={() =>
                                 handleSort(`${column.toLowerCase()}`)
                              }
                              className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
                           >
                              <div className='flex items-center gap-2'>
                                 {column}
                                 <GrFilter />
                              </div>
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className=''>
                     {sortedData.map(entity => (
                        <tr key={entity.id}>
                           <td className='p-4 border-b border-blue-gray-50'>
                              {entity.id}
                           </td>
                           <td className='p-4 border-b border-blue-gray-50'>
                              {entity.name}
                           </td>
                           <td className='p-4 border-b border-blue-gray-50'>
                              {entity.email}
                           </td>
                           <td className='p-4 border-b border-blue-gray-50'>
                              {entity.phone}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className='w-full flex items-center justify-between'>
               <div className='mt w-1/4 flex justify-start pl-2'>
                  <select
                     onChange={e => handleSetEntitiesPerPage(e)}
                     className='select w-full rounded-md border-1 border-gray-100  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:outline-0 disabled:border-0 bg-white shadow-sm disabled:bg-blue-gray-50'
                  >
                     <option disabled selected className='text-xs'>
                        Rows per page
                     </option>
                     <option value='5'>5</option>
                     <option value='10'>10</option>
                     <option value='15'>15</option>
                     <option value='20'>20</option>
                  </select>
               </div>
               <div className='mt-4 flex justify-end pr-2'>
                  <div className='flex items-center gap-6'>
                     <button
                        disabled={currentPage <= 1 ? true : false}
                        className={`
                     ${
                        currentPage > 1
                           ? 'w-8 h-8 hover:bg-sky-700 p-2 bg-sky-500 flex items-center justify-center text-white font-semibold rounded-md shdow'
                           : 'w-8 h-8 p-2 flex items-center justify-center rounded-md bg-gray-200 text-gray-700 cursor-not-allowed'
                     }
                     `}
                        onClick={handlePreviousBtn}
                     >
                        <BiLeftArrow />
                     </button>
                     <div>
                        {pageNumbers.map(num => (
                           <button
                              key={num}
                              id={num}
                              onClick={handleClick}
                              className={`
                     ${
                        num === currentPage
                           ? 'mx-2 px-4 py-2 border shadow-sm shadow-sky-300 rounded-md bg-sky-600 text-white text-sm transition duration-500'
                           : 'text-gray-700 rounded-md text-sm px-4 py-2 hover:bg-gray-200 transition duration-150'
                     }
                     `}
                           >
                              {num}
                           </button>
                        ))}
                     </div>
                     <button
                        disabled={
                           currentPage >= Number(pageNumbers.length)
                              ? true
                              : false
                        }
                        className={`
                     ${
                        currentPage < Number(pageNumbers.length)
                           ? 'w-8 h-8 hover:bg-sky-700 p-2 bg-sky-500 flex items-center justify-center text-white font-semibold rounded-md shdow'
                           : 'w-8 h-8 p-2 flex items-center justify-center rounded-md bg-gray-200 text-gray-700 cursor-not-allowed'
                     }
                     `}
                        onClick={handleNextBtn}
                     >
                        <BiRightArrow />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MyTable;
