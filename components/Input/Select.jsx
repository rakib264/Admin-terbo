'use client';

import { useEffect } from 'react';
import Input from './InputCom';

const Select = ({
   label,
   option,
   register,
   id,
   required,
   errors,
   nameW,
   index,
   imgBody,
   imgUrl,
   defaultValue,
   setValue,
   flag,
   streamingKey
}) => {
   useEffect(() => {
      if (defaultValue?.length > 0)
         setValue(id, defaultValue, { shouldDirty: true });
      else {
         setValue(id, option.length > 0 && option[0]?.name);
      }
   }, [defaultValue, setValue, id]);

   // console.log('streamingKey', streamingKey);
   // console.log('Default', defaultValue);

   return (
      <div className='w-full flex flex-col gap-2'>
         <label htmlFor={id}>{label}</label>
         <select
            id={id}
            {...register(id, { required })}
            defaultValue={defaultValue}
            className='select w-full rounded-md border-[1px] border-gray-300  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:outline-0 disabled:border-0 bg-white shadow-sm disabled:bg-blue-gray-50'
         >
            <option
               value={
                  defaultValue?.length > 0 ? defaultValue : 'Select One'
                  // : option?.length > 0 && option[0]?.name
               }
               selected
            >
               {
                  defaultValue?.length > 0 ? defaultValue : 'Select One'
                  // : option?.length > 0 && option[0]?.name
               }
            </option>
            {option?.map(optionItem => (
               <option key={optionItem?.id} value={option.name}>
                  {optionItem?.name}
               </option>
            ))}
         </select>

         {errors[id] && (
            <div className='py-2 text-rose-400 text-sm font-semibold'>
               {errors[id]?.message}
            </div>
         )}
         {nameW === 'OwnStream' && (
            <div className='w-full pt-2'>
               <Input
                  type='text'
                  label='Stream Key'
                  id={`streaming_sources.${index}.stream_key`}
                  required
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  defaultValue={streamingKey}
               />
            </div>
         )}

         {nameW === 'Url' && <div>{imgUrl}</div>}
         {nameW === 'Image' && <div>{imgBody}</div>}
         {nameW !== 'Image' &&
            nameW !== 'Url' &&
            defaultValue !== undefined &&
            flag === 'team_one_image' && (
               <img
                  src={defaultValue}
                  alt='Image Preview'
                  className='w-full h-[256px] object-cover rounded-md'
                  // onMouseEnter={onMouseEnterPreview}
                  // onMouseLeave={onMouseLeavePreview}
               />
            )}
         {nameW !== 'Image' &&
            nameW !== 'Url' &&
            defaultValue !== undefined &&
            flag === 'team_two_image' && (
               <img
                  src={defaultValue}
                  alt='Image Preview'
                  className='w-full h-[256px] object-cover rounded-md'
                  // onMouseEnter={onMouseEnterPreview}
                  // onMouseLeave={onMouseLeavePreview}
               />
            )}
      </div>
   );
};

export default Select;
