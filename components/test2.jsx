import { addDays, format, subDays } from 'date-fns';
import { useState } from 'react';

const DatePicker = () => {
   // Get the current date
   const currentDate = new Date();

   // Set up state to track the selected date
   const [selectedDate, setSelectedDate] = useState(currentDate);

   // Function to handle date selection
   const handleDateChange = date => {
      setSelectedDate(date);
   };

   // Generate an array of dates
   const generateDatesArray = (date, numDays) => {
      const datesArray = [];
      for (let i = -numDays; i <= numDays; i++) {
         const newDate = i < 0 ? subDays(date, Math.abs(i)) : addDays(date, i);
         datesArray.push(newDate);
      }
      return datesArray;
   };

   // Generate the array of dates
   const datesArray = generateDatesArray(selectedDate, 4);

   return (
      <div>
         {/* Render the date picker */}
         <input
            type='date'
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={e => handleDateChange(new Date(e.target.value))}
         />

         {/* Render the array of dates */}
         <ul className='flex items-center gap-6'>
            {datesArray.map(date => (
               <li key={date}>{format(date, 'yyyy-MM-dd')}</li>
            ))}
         </ul>
      </div>
   );
};

export default DatePicker;