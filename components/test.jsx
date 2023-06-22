import axios from 'axios';
import { addDays, format, subDays } from 'date-fns';
import { useState } from 'react';

const DatePicker = () => {
   const currentDate = new Date();

   //    console.log(`${format(currentDate, 'dd.MM.yyyy')}`);
   //    console.log(`${format(currentDate, 'yyyy-MM-dd').toString()}`);
   //    console.log(`today is ${format(currentDate, 'EEEE, MMMM yyyy')}`);
   //    console.log(
   //       `today is  ${format(currentDate, 'EEEE,MMMM do, yyyy hh:mm a')}`
   //    );
   //    console.log(`Today's currentDate: ${format(currentDate, 'MMMM, yyyy')}`);
   //    console.log(`Today's currentDate: ${format(currentDate, 'MMMM.do.')}`);
   //    console.log(`Today's currentDate: ${format(currentDate, 'EEEE do HH:mm ')}`);
   //    console.log(`${format(currentDate, 'EEEE,MMMM do, yyyy ppppp')}`);
   //    console.log(`${format(currentDate, 'do  MMMM yyyy OOOO')}`);

   const handleClick = async () => {
      let instance = axios.create({
         baseURL: 'https://soccer.sportmonks.com/api/v2.0/',
         timeout: 15000,
         headers: {
            'content-type': 'application/json',
            Accept: 'application/json'
         },
         params: {
            api_token: process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN
         }
      });
      if (selectedDate) {
         const pickedDate = format(selectedDate, 'yyyy-MM-dd');
         const response = await instance.get(
            `fixtures/date/${pickedDate}?include=localTeam,visitorTeam,league,venue,referee`
         );

         console.log('Data: ', response.data);
      }
   };

   const [selectedDate, setSelectedDate] = useState(currentDate);

   const handleDateChange = date => {
      setSelectedDate(date);
   };

   //    const getIsToday = date => {
   //       console.log('Clicked!');
   //       const today = new Date();
   //       const givenDate = new Date(date);
   //       console.log('Today', today);
   //       console.log('givenDate', givenDate);
   //       console.log(today.toDateString() === givenDate.toDateString());
   //       return today.toDateString() === givenDate.toDateString();
   //    };

   const generateDatesArray = (date, numDays) => {
      const datesArray = [];
      for (let i = -numDays; i <= numDays; i++) {
         const newDate = i < 0 ? subDays(date, Math.abs(i)) : addDays(date, i);
         datesArray.push(newDate);
      }
      return datesArray;
   };

   const datesArray = generateDatesArray(selectedDate, 4);

   return (
      <div className='py-8'>
         {/* <input
            type='date'
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={e => handleDateChange(new Date(e.target.value))}
            className='custom-date-input'
         /> */}
         <div className='w-full'>
            <div className='relative h-11 w-full min-w-[200px]'>
               <input
                  className='peer h-full w-full rounded-md border-0 shadow-sm border-blue-gray-200  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
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
         {/* <DatePickerInput
            label='Pick a date'
            type='date'
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={handleDateChange}
         /> */}

         <ul className='flex items-center gap-6 py-8'>
            {datesArray.map((date, index) => (
               <li
                  key={date}
                  className='flex flex-col ga-1 bg-gray-600 text-white px-3 py-2'
                  onClick={() => handleDateChange(new Date(date))}
               >
                  {format(date, 'yyyy-MM-dd')}
                  <div onClick={handleClick}>
                     {currentDate.toDateString() === date.toDateString() ? (
                        <div>{`Today ${format(date, ', dd MMMM')}`}</div>
                     ) : (
                        <div>{`${format(date, 'EEE, dd MMMM')}`}</div>
                     )}
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default DatePicker;
