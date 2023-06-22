// import SearchInput from '@/components/Input/Search';

// const TABLE_HEAD = ['Transaction', 'Amount', 'Date', 'Status', 'Account', ''];

// const TABLE_ROWS = [
//    {
//       img: '/img/logos/logo-spotify.svg',
//       name: 'Spotify',
//       amount: '$2,500',
//       date: 'Wed 3:00pm',
//       status: 'paid',
//       account: 'visa',
//       accountNumber: '1234',
//       expiry: '06/2026'
//    },
//    {
//       img: '/img/logos/logo-amazon.svg',
//       name: 'Amazon',
//       amount: '$5,000',
//       date: 'Wed 1:00pm',
//       status: 'paid',
//       account: 'master-card',
//       accountNumber: '1234',
//       expiry: '06/2026'
//    },
//    {
//       img: '/img/logos/logo-pinterest.svg',
//       name: 'Pinterest',
//       amount: '$3,400',
//       date: 'Mon 7:40pm',
//       status: 'pending',
//       account: 'master-card',
//       accountNumber: '1234',
//       expiry: '06/2026'
//    },
//    {
//       img: '/img/logos/logo-google.svg',
//       name: 'Google',
//       amount: '$1,000',
//       date: 'Wed 5:00pm',
//       status: 'paid',
//       account: 'visa',
//       accountNumber: '1234',
//       expiry: '06/2026'
//    },
//    {
//       img: '/img/logos/logo-netflix.svg',
//       name: 'netflix',
//       amount: '$14,000',
//       date: 'Wed 3:30am',
//       status: 'cancelled',
//       account: 'visa',
//       accountNumber: '1234',
//       expiry: '06/2026'
//    }
// ];

// export default function Example() {
//    return (
//       <div className='h-full w-full'>
//          <div className='shadow rounded-none'>
//             <div className='mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center'>
//                <div>
//                   <h5 className='text-gray-700'>Recent Transactions</h5>
//                   <h5 className='text-gray-800 mt-1 font-normal'>
//                      These are details about the last transactions
//                   </h5>
//                </div>
//                <div className='flex w-full shrink-0 gap-2 md:w-max'>
//                   <div className='w-full md:w-72'>
//                      <SearchInput />
//                   </div>
//                </div>
//             </div>
//          </div>
//          <div className='overflow-scroll px-0'>
//             <table className='w-full min-w-max table-auto text-left'>
//                <thead>
//                   <tr>
//                      {TABLE_HEAD.map(head => (
//                         <th
//                            key={head}
//                            className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
//                         >
//                            <h4 className=' text-gray-700 font-normal leading-none opacity-70'>
//                               {head}
//                            </h4>
//                         </th>
//                      ))}
//                   </tr>
//                </thead>
//                {/* <tbody>
//                   {TABLE_ROWS.map((name, index) => {
//                      return (
//                         <tr key={index}>
//                            <td className=''>{name}</td>
//                         </tr>
//                      );
//                   })}
//                </tbody> */}
//             </table>
//          </div>
//          <nav>
//             <ul class='flex'>
//                <li>
//                   <a
//                      class='mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out'
//                      href='#'
//                   >
//                      1
//                   </a>
//                </li>
//                <li>
//                   <a
//                      class='mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300'
//                      href='#'
//                   >
//                      2
//                   </a>
//                </li>
//                <li>
//                   <a
//                      class='mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300'
//                      href='#'
//                   >
//                      3
//                   </a>
//                </li>
//             </ul>
//          </nav>
//       </div>
//    );
// }

'use client';

import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const MyTable = ({ entities, columns }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const [entitiesPerPage] = useState(5);
   const [search, setSearch] = useState('');

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

   const handleClick = event => {
      setCurrentPage(Number(event.target.id));
   };

   return (
      <div className='container mx-auto w-full pt-6 px-12'>
         <div className='flex flex-col gap-2 bg-gray-100 px-12 py-8'>
            {/* Search Input */}

            <div className='w-1/2'>
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

            {/* Search Input */}
            {/* <input
               className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
               placeholder='Search for...'
               onChange={e => setSearch(e.target.value)}
            /> */}
            <div className='w-full bg-white shadow overflow-scroll border-b sm:rounded-lg mt-6'>
               <table className='w-full min-w-max table-auto text-left'>
                  <thead>
                     <tr>
                        {columns.map(column => (
                           <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                              {column}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {searchEntities.map(entity => (
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
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className='mt-4'>
               {pageNumbers.map(num => (
                  <button
                     key={num}
                     id={num}
                     onClick={handleClick}
                     className={`
                     ${
                        num === currentPage
                           ? 'mx-1 px-4 py-2 border shadow rounded-md bg-sky-600 text-white text-sm transition duration-500'
                           : 'text-gray-700 rounded-md text-sm px-4 py-2 hover:bg-gray-100  transition duration-300'
                     }
                     `}
                  >
                     {num}
                  </button>
               ))}
            </div>
         </div>
      </div>
   );
};

export default MyTable;
