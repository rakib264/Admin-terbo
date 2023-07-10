'use client';
import { usePostFixuresMutation } from '@/features/api/apiSlice';
import { addDays, format, subDays } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdPendingActions } from 'react-icons/md';
import Spinner from '../Spinner/page';

export const finished = ['FT', 'AET', 'FT_PEN'];
export const live = [
   'INPLAY_1ST_HALF',
   'INPLAY_2ND_HALF',
   'HT',
   'INPLAY_ET',
   'INPLAY_ET_2ND_HALF',
   'BREAK',
   'PEN_BREAK',
   'EXTRA_TIME_BREAK',
   'INPLAY_PENALTIES'
];
export const upComing = [
   'TBA',
   'NS',
   'WO',
   'ABANDONED',
   'CANCELLED',
   'AWARDED',
   'INTERRUPTED'
];

const FixureComponent = () => {
   const currentDate = new Date();
   const [selectedDate, setSelectedDate] = useState(currentDate);
   const [actionMenu, setActionMenu] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [entitiesPerPage, setEntitiesPerPage] = useState(10);
   const pickedDate = format(selectedDate, 'yyyy-MM-dd');

   const [postFixures, { data, error, isLoading, isSuccess, isError }] =
      usePostFixuresMutation();

   console.log('Data :', data);

   const api_key = process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN;
   useEffect(() => {
      postFixures({
         date: pickedDate,
         api_key
      });
   }, [selectedDate]);

   const handleClickEvent = async () => {
      postFixures({
         date: pickedDate,
         api_key
      });
   };

   const handleDateChange = date => {
      setSelectedDate(date);
   };

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

   const generateDatesArray = (date, numDays) => {
      const datesArray = [];
      for (let i = -numDays; i <= numDays; i++) {
         const newDate = i < 0 ? subDays(date, Math.abs(i)) : addDays(date, i);
         datesArray.push(newDate);
      }
      return datesArray;
   };

   const datesArray = generateDatesArray(selectedDate, 4);

   const finalResult = data?.result?.data;

   const newArray =
      finalResult &&
      [...finalResult].sort((a, b) => {
         const aLeague = a.league_id;
         const bLeague = b.league_id;
         if (aLeague > bLeague) {
            return 1;
         } else {
            return -1;
         }
      });

   // Logic for displaying current entities
   const indexOfLastEntity = currentPage * entitiesPerPage;
   const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;
   const currentEntities = newArray?.slice(
      indexOfFirstEntity,
      indexOfLastEntity
   );

   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(newArray?.length / entitiesPerPage); i++) {
      pageNumbers.push(i);
   }

   const handleActionMenuOpen = index => {
      if (index) {
         setActionMenu(index);
      }
   };

   const handleActionMenuClose = () => {
      setActionMenu(null);
   };

   return (
      <div className='py-8 bg-gray-100'>
         <div className='grid grid-cols-6 gap-3 items-center px-2'>
            <div className='col-span-6 sm:col-span-4 md:col-span-5 overflow-x-scroll md:overflow-x-hidden'>
               <ul className='flex items-center gap-2 py-4'>
                  {datesArray.map((date, index) => (
                     <li
                        key={date}
                        className='ring-[2px] ring-purple-200 flex items-center justify-center cursor-pointer bg-sky-700 gap-1 rounded-md border-b-1 w-24 h-12 border-sky-700 text-white'
                        onClick={() => handleDateChange(new Date(date))}
                     >
                        <div className='' onClick={handleClickEvent}>
                           {currentDate.toDateString() ===
                           date.toDateString() ? (
                              <div className='w-24 h-16 px-3 py-2 flex items-center justify-center text-xs text-sky-200 font-bold'>{`Today ${format(
                                 date,
                                 ' dd MMM'
                              )}`}</div>
                           ) : (
                              <div className='w-24 h-16 px-3 py-2 flex items-center justify-center text-xs'>{`${format(
                                 date,
                                 'EEE dd MMM'
                              )}`}</div>
                           )}
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
            <div className='col-span-6 sm:col-span-2 md:col-span-1'>
               <div className='relative h-11'>
                  <input
                     className='peer h-full w-full rounded-md border-0 shadow-sm border-blue-gray-200  bg-transparent px-3 py-3 font-sans text-xs font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                     placeholder=''
                     type='date'
                     value={format(selectedDate, 'yyyy-MM-dd')}
                     onChange={e => handleDateChange(new Date(e.target.value))}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                     Pick a date
                  </label>
               </div>
            </div>
         </div>
         {isLoading && <Spinner />}
         {isSuccess && (
            <div className='w-full items-center my-4'>
               <div className='py-1 w-full h-screen sm:h-[40rem] overflow-y-scroll'>
                  {currentEntities?.map((item, index) => (
                     <div
                        key={index}
                        className='flex flex-col gap-4 bg-gray-200 rounded-md px-4 py-1 my-1'
                     >
                        <div className='text-sky-800 font-bold py-1'>
                           {item?.league?.name !==
                           currentEntities[index - 1]?.league?.name
                              ? item?.league?.name
                              : ''}
                        </div>
                        <div className='grid grid-cols-10 gap-0 items-center pb-3'>
                           <div className='col-span-3 flex items-center gap-2'>
                              <div className=' text-gray-400 text-sm'>
                                 {item?.state?.short_name}
                              </div>
                              <div className=' flex items-center gap-2 sm:gap-4'>
                                 <Image
                                    src={item?.participants[0]?.image_path}
                                    width='30'
                                    height='30'
                                    className='rounded-full p-1'
                                    alt='League Logo'
                                    unoptimized={true}
                                 />
                                 <h5 className='text-xs md:text-sm'>
                                    {item?.participants[0].name}
                                 </h5>
                              </div>
                           </div>
                           <div className='col-span-2  flex justify-center'>
                              {finished.includes(item?.state?.state) && (
                                 <div className='flex items-center justify-center w-20 md:w-24 bg-sky-600 rounded-md px-3 py-1 text-white font-semibold'>
                                    <h5 className='text-xs md:text-sm'>
                                       {item?.scores[1]?.score?.goals}
                                    </h5>
                                    <div className='px-2'> - </div>
                                    <h5 className='text-xs md:text-sm'>
                                       {item?.scores[2]?.score?.goals}
                                    </h5>
                                 </div>
                              )}
                              {live.includes(item?.state?.state) && (
                                 <div className='flex items-center justify-center w-20 md:w-24 bg-sky-600 rounded-md px-3 py-1 text-white font-semibold'>
                                    <h5 className='text-xs md:text-sm'>
                                       {item?.scores[1]?.score?.goals}
                                    </h5>
                                    <div className='px-2'> - </div>
                                    <h5 className='text-xs md:text-sm'>
                                       {item?.scores[2]?.score?.goals}
                                    </h5>
                                 </div>
                              )}
                              {upComing.includes(item?.state?.state) && (
                                 <div className='flex flex-col items-center w-20 md:w-24 bg-sky-600 rounded-md px-3 py-1 gap-1 justify-center'>
                                    <div className='text-xs md:text-sm text-white'>
                                       {format(
                                          new Date(item?.starting_at),
                                          'dd MMM'
                                       )}
                                    </div>
                                    <div className='text-xs md:marker:text-sm text-white'>
                                       {format(
                                          new Date(item?.starting_at),
                                          'hh:mm'
                                       )}
                                    </div>
                                 </div>
                              )}
                           </div>
                           <div className='col-span-3  flex items-center gap-2 sm:gap-4'>
                              <Image
                                 src={item?.participants[1]?.image_path}
                                 width='30'
                                 height='30'
                                 className='rounded-full p-1'
                                 loader={() => {
                                    item?.participants[1]?.image_path;
                                 }}
                                 alt='League Logo'
                                 unoptimized={true}
                              />
                              <h5 className='text-xs md:text-sm'>
                                 {item?.participants[1].name}
                              </h5>
                           </div>
                           <div className='col-span-2  relative'>
                              <div
                                 onClick={() => handleActionMenuOpen(index + 1)}
                                 className='p-1 w-6 h-6 bg-sky-600 rounded-sm cursor-pointer focus:bg-sky-800 flex items-center justify-center'
                              >
                                 <MdPendingActions className='w-6 h-6 text-white' />
                              </div>
                              {actionMenu === index + 1 && (
                                 <div className='absolute top-7 left-0 z-40 w-32 flex flex-col gap-1 p-1 rounded-md bg-white transition-all duration-300 ease-in-out shadow '>
                                    <div
                                       onClick={handleActionMenuClose}
                                       className='flex items-center gap-2 p-1 bg-gray-200 hover:bg-gray-300 cursor-pointer'
                                    >
                                       <IoMdNotificationsOutline className='w-4 h-4 text-gray-800' />
                                       <div className='text-xs text-gray-600'>
                                          Push Notification
                                       </div>
                                    </div>
                                    <div
                                       onClick={handleActionMenuClose}
                                       className='flex items-center gap-2 p-1 bg-gray-200 hover:bg-gray-300 cursor-pointer'
                                    >
                                       <IoMdNotificationsOutline className='w-4 h-4 text-gray-800' />
                                       <div className='text-xs text-gray-600'>
                                          Action Notification
                                       </div>
                                    </div>
                                    <div
                                       onClick={handleActionMenuClose}
                                       className='flex items-center gap-2 p-1 bg-gray-200 hover:bg-gray-300 cursor-pointer'
                                    >
                                       <IoMdNotificationsOutline className='w-4 h-4 text-gray-800' />
                                       <div className='text-xs text-gray-600'>
                                          Action Notification
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
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
         )}
         {isError && <div>{error}</div>}
      </div>
   );
};

export default FixureComponent;
