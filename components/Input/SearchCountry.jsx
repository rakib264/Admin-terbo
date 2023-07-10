'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function SearchCountry({
   id,
   register,
   setValue,
   defaultValue,
   errors
}) {
   const [countries, setCountries] = useState([]);

   const fetchedCountries = async () => {
      const response = await axios
         .get('https://trial.mobiscroll.com/content/countries.json')
         .catch(err => console.log(err));
      const data = response.data;
      const countries = [];
      for (let i = 0; i < data.length; ++i) {
         const country = data[i];
         countries.push({ label: country.text, value: country.value });
      }
      setCountries(countries);
   };

   useEffect(() => {
      fetchedCountries();
   }, []);

   const options = countries;

   // const myOptions = [
   //    { value: 'chocolate', label: 'Chocolate' },
   //    { value: 'strawberry', label: 'Strawberry' },
   //    { value: 'vanilla', label: 'Vanilla' }
   // ];

   // useEffect(() => {
   //    if (defaultValue?.length > 0)
   //       setValue(id, defaultValue, { shouldDirty: true });
   //    else {
   //       setValue(id, options.length > 0 && options[0]?.label);
   //    }
   // }, [defaultValue, setValue, id]);

   console.log('Default value', id, defaultValue);

   useEffect(() => {
      setValue(id, defaultValue, { shouldDirty: true });
   }, [defaultValue, setValue, id]);

   const handleSelectChange = selectedOptions => {
      // Set the value of the field using setValue

      setValue(id, selectedOptions);
   };

   return (
      <div className='flex flex-col p-3'>
         <Select
            id={id}
            required
            {...register(id, { required: true })}
            onChange={handleSelectChange}
            // placeholder={
            //    <div className='text-sm text-black'>Block Country</div>
            // }
            isMulti
            defaultValue={defaultValue}
            options={options}
         />
         {errors[id] && (
            <div className='py-2 text-rose-400 text-sm font-semibold'>
               {errors[id]?.message}
            </div>
         )}
      </div>
   );
}
