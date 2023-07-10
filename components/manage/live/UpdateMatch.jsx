'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import {
   ImageTypeOptions,
   PlatformOptions,
   PremiumOptions,
   ResolutionOptions,
   StatusOptions,
   StreamTypeOptions
} from '@/components/helper/selectOptions';
import DatePickerInput from '@/components/Input/DatePicker';
import Input from '@/components/Input/InputCom';
import Select from '@/components/Input/Select';
import TextArea from '@/components/Input/Textarea';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useGetSingleMatchQuery } from '@/features/api/apiSlice';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineDeleteSweep } from 'react-icons/md';

//Custom Component
const StreamItemFields = ({
   itemIndex,
   control,
   errors,
   register,
   headers,
   setValue
}) => {
   const { fields, append, remove } = useFieldArray({
      name: `streaming_sources[${itemIndex}].headers`,
      // name: `${headers} ? ${headers} : headers`,
      control
   });

   if (headers?.length > 0) {
      let initialFieldValues = JSON.parse(headers);
      let newFields = [];

      // Push new field objects to newFields array
      for (let i = 0; i < initialFieldValues.length; i++) {
         newFields.push({ ...initialFieldValues[i] });
      }

      // Update the fields array with the newFields array
      fields.splice(0, fields.length, ...newFields);
   }

   //console.log('Headers: ', headers);

   // useEffect(() => {

   // }, [])

   return (
      <>
         {/* <div className='w-full flex flex-col gap-12'>
            {JSON.parse(headers?.length) > 0 &&
               JSON.parse(headers)?.map((field, i) => (
                  <div
                     key={field.id}
                     className='w-full relative flex flex-col gap-2'
                  >
                     {i > 0 && (
                        <button
                           onClick={() => remove(i)}
                           className='absolute right-0 -top-10 flex items-center justify-center bg-teal-600 text-sm p-1 w-8 h-8 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'
                        >
                           <MdOutlineDeleteSweep className='w-6 h-6' />
                        </button>
                     )}
                     <div className='w-full md:gap-6 md:flex md:items-center md:justify-between'>
                        <div className='w-full'>
                           <Input
                              type='text'
                              label='Name'
                              id={`streaming_sources[${itemIndex}].headers[${i}].name`}
                              required
                              register={register}
                              errors={errors}
                              setValue={setValue}
                              defaultValue={field?.name}
                           />
                        </div>
                        <div className='w-full'>
                           <Input
                              type='text'
                              label='Value'
                              id={`streaming_sources[${itemIndex}].headers[${i}].value`}
                              required
                              register={register}
                              errors={errors}
                              setValue={setValue}
                              defaultValue={field?.value}
                           />
                        </div>
                     </div>
                  </div>
               ))}
            <div className='my-4 relative'>
               <button
                  type='button'
                  onClick={() => append({})}
                  className='absolute right-0 bottom-0 bg-teal-600 text-sm px-2 py-2 w-24 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'
               >
                  Add
               </button>
            </div>
         </div> */}
         <div className='w-full flex flex-col gap-12'>
            {fields?.map((field, i) => (
               <div
                  key={field.id}
                  className='w-full relative flex flex-col gap-2'
               >
                  {i > 0 && (
                     <button
                        onClick={() => remove(i)}
                        className='absolute right-0 -top-10 flex items-center justify-center bg-teal-600 text-sm p-1 w-8 h-8 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'
                     >
                        <MdOutlineDeleteSweep className='w-6 h-6' />
                     </button>
                  )}
                  <div className='w-full md:gap-6 md:flex md:items-center md:justify-between'>
                     <div className='w-full'>
                        <Input
                           type='text'
                           label='Name'
                           id={`streaming_sources[${itemIndex}].headers[${i}].name`}
                           required
                           register={register}
                           errors={errors}
                           setValue={setValue}
                           defaultValue={field?.name}
                        />
                     </div>
                     <div className='w-full'>
                        <Input
                           type='text'
                           label='Value'
                           id={`streaming_sources[${itemIndex}].headers[${i}].value`}
                           required
                           register={register}
                           errors={errors}
                           setValue={setValue}
                           defaultValue={field?.value}
                        />
                     </div>
                  </div>
               </div>
            ))}
            <div className='my-4 relative'>
               <button
                  type='button'
                  onClick={() => {
                     console.log('Clicked');
                     append({});
                  }}
                  className='absolute right-0 bottom-0 bg-teal-600 text-sm px-2 py-2 w-24 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'
               >
                  Add
               </button>
            </div>
         </div>
      </>
   );
};

//Main Component
const UpdateMatch = ({ matchId }) => {
   const [isHover, setIsHover] = useState(true);
   const [imageOneSrc, setImageOneSrc] = useState(null);
   const [imageTwoSrc, setImageTwoSrc] = useState(null);
   const [fileOne, setFileOne] = useState(null);
   const [fileTwo, setFileTwo] = useState(null);
   const [teamoneUrl, setTeamoneUrl] = useState('');
   const [teamtwoUrl, setTeamtwoUrl] = useState('');
   const [dataLength, setDataLength] = useState(null);
   // const [arrayLength, setArrayLength] = useState(
   //    defaultData?.streaming_sources?.length
   // );

   //const [dataArray, setDataArray] = useState(null);

   const { data: getMatchData } = useGetSingleMatchQuery(matchId);

   const defaultData = getMatchData?.data;
   // console.log('defaultData', defaultData);
   //    console.log(format(new Date(defaultData?.time), 'yyyy-MM-dd'));

   let length = defaultData?.streaming_sources?.length;
   console.log(length);

   useEffect(() => {
      if (length > 0) {
         console.log('Length: ', length);
         setDataLength(length);
      }
   }, [length, setDataLength]);

   // if (length !== null) {
   //    setArrayLength(length);
   // }

   // if (defaultData !== null) {
   //    setDataArray(defaultData?.streaming_sources?.length);
   // }

   const handleAddMore = () => {
      //console.log('Clicked');
      setDataLength(prevState => prevState + 1);
   };

   const removeData = () => {
      //console.log('Clicked');
      setDataLength(prevState => prevState - 1);
   };

   const {
      register,
      handleSubmit,
      formState,
      control,
      watch,
      setValue,
      reset
   } = useForm({
      defaultValues: {
         streaming_sources: [
            {
               stream_title: '',
               portrait_watermark: '',
               landscape_watermark: '',
               stream_url: '',
               resolution: '',
               is_premium: '',
               platform: '',
               stream_status: '',
               stream_type: '',
               stream_key: '',
               headers: []
            }
         ]
      }
   });

   const { errors } = formState;

   const title = watch('title');
   const time = watch('time');
   const fixture_id = watch('fixture_id');
   const team_one_name = watch('team_one_name');
   const team_two_name = watch('team_two_name');
   const portrait_watermark = watch('portrait_watermark');
   const landscape_watermark = watch('landscape_watermark');
   const team_one_image = watch('team_one_image');
   const team_two_image = watch('team_two_image');
   // const team_one_url = watch('team_one_url');
   // const team_two_url = watch('team_two_url');

   const { fields, append, remove } = useFieldArray({
      name: 'streaming_sources',
      control
   });

   // const [newFields, setNewField] = useState(defaultData?.streaming_sources);

   const handleFileChange = (event, imgSrc) => {
      const file = event.target.files[0];
      console.log('file', file);
      if (imgSrc === 'team_one_image_src') {
         setFileOne(event.target.files[0]);
         if (event.target.files.length !== 0) {
            setImageOneSrc(URL.createObjectURL(event.target.files[0]));
         }
      }
      if (imgSrc === 'team_two_image_src') {
         setFileTwo(event.target.files[0]);
         if (event.target.files.length !== 0) {
            setImageTwoSrc(URL.createObjectURL(event.target.files[0]));
         }
      }
   };

   const handleImageOneInput = () => {
      setImageOneSrc(null);
   };

   const handleImageTwoInput = () => {
      setImageTwoSrc(null);
   };

   const teamOneImageUrl = (
      <div className='w-full flex flex-col gap-2'>
         <div className='relative h-11 w-full min-w-[200px]'>
            <input
               id='teamTwo'
               required
               value={teamoneUrl}
               onChange={e => setTeamoneUrl(e.target.value)}
               className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
               placeholder=' '
               type='text'
            />
            <label
               for='teamtwo'
               className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
               Image Url
            </label>
         </div>
         {teamoneUrl.length > 0 && (
            <div className='w-full h-[256px] rounded-md relative'>
               <img
                  src={teamoneUrl}
                  alt='Image Preview'
                  className='w-2/3 h-2/3 object-contain rounded-md'
                  // onMouseEnter={onMouseEnterPreview}
                  // onMouseLeave={onMouseLeavePreview}
               />
            </div>
         )}

         {/* {teamoneUrl.length === 0 && (
          <div className='py-2 text-rose-400 text-sm font-semibold'>
             Team Two Image Url is required
          </div>
       )} */}
      </div>
   );

   const teamTwoImageUrl = (
      <div className='w-full flex flex-col gap-2'>
         <div className='relative h-11 w-full min-w-[200px]'>
            <input
               id='teamTwo'
               required
               value={teamtwoUrl}
               onChange={e => setTeamtwoUrl(e.target.value)}
               className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
               placeholder=' '
               type='text'
            />
            <label
               for='teamtwo'
               className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
               Image Url
            </label>
         </div>

         {teamtwoUrl.length > 0 && (
            <div className='w-full h-[256px] rounded-md relative'>
               <img
                  src={teamtwoUrl}
                  alt='Image Preview'
                  className='w-2/3 h-2/3 object-contain rounded-md'
                  // onMouseEnter={onMouseEnterPreview}
                  // onMouseLeave={onMouseLeavePreview}
               />
            </div>
         )}

         {/* {teamoneUrl.length < 1 && (
          <div className='py-2 text-rose-400 text-sm font-semibold'>
             Team Two Image Url is required
          </div>
       )} */}
      </div>
   );

   const team_one_imageBody = (
      <div className='w-full pt-2'>
         {/* <input
          type='file'
          accept='image/*'
          onChange={e => handleFileChange(e, 'team_one_image_src')}
       /> */}
         {/* Display Image Preview */}

         {/* {defaultData?.team_one_image && (
            <img
               src={defaultData?.team_one_image}
               alt='Image Preview'
               className='w-full h-auto rounded-md'
               // onMouseEnter={onMouseEnterPreview}
               // onMouseLeave={onMouseLeavePreview}
            />
         )} */}

         {imageOneSrc ? (
            <div className='w-full h-64 rounded-md relative'>
               <img
                  src={imageOneSrc}
                  alt='Image Preview'
                  className='flex items-center justify-center w-full h-64 rounded-md'
                  // onMouseEnter={onMouseEnterPreview}
                  // onMouseLeave={onMouseLeavePreview}
               />
               <div
                  // className={`absolute right-2 top-2 cursor-pointer w-10 h-10 rounded-md bg-gray-200
                  // ${isHover ? 'flex items-center justify-center' : 'hidden'}`}
                  className={`absolute right-2 top-2 cursor-pointer w-10 h-10 rounded-md bg-rose-200 flex items-center justify-center
                `}
                  onClick={handleImageOneInput}
               >
                  <MdOutlineDeleteSweep className='w-6 h-6 text-rose-400' />
               </div>
               {/* {isHover && (
                <div
                   className='w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center'
                   onClick={() => setImageSrc(null)}
                >
                   <MdOutlineDeleteSweep className='w-6 h-6 text-rose-400' />
                </div>
             )} */}
            </div>
         ) : (
            <label
               for='dropzone-file'
               className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
            >
               <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <svg
                     aria-hidden='true'
                     className='w-10 h-10 mb-3 text-gray-400'
                     fill='none'
                     stroke='currentColor'
                     viewBox='0 0 24 24'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                     ></path>
                  </svg>
                  <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                     <span className='font-semibold'>Click to upload</span> or
                     drag and drop
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                     SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
               </div>
               <input
                  id='dropzone-file'
                  type='file'
                  accept='image/*'
                  onChange={e => handleFileChange(e, 'team_one_image_src')}
                  className='hidden'
               />
            </label>
         )}
      </div>
   );

   const team_two_imageBody = (
      <div className='w-full pt-2'>
         {/* <input
          type='file'
          accept='image/*'
          onChange={e => handleFileChange(e, 'team_two_image_src')}
       /> */}
         {/* Display Image Preview */}

         {/* {defaultData?.team_two_image && (
            <img
               src={defaultData?.team_two_image}
               alt='Image Preview'
               className='w-full h-auto rounded-md'
               // onMouseEnter={onMouseEnterPreview}
               // onMouseLeave={onMouseLeavePreview}
            />
         )} */}

         {imageTwoSrc ? (
            <div className=' w-full h-64 rounded-md relative'>
               <img
                  src={imageTwoSrc}
                  alt='Image Preview'
                  className='flex items-center justify-center w-full h-64 rounded-md'
                  // onMouseEnter={onMouseEnterPreview}
                  // onMouseLeave={onMouseLeavePreview}
               />
               <div
                  // className={`absolute right-2 top-2 cursor-pointer w-10 h-10 rounded-md bg-gray-200
                  // ${isHover ? 'flex items-center justify-center' : 'hidden'}`}
                  className={`absolute right-2 top-2 cursor-pointer w-10 h-10 rounded-md bg-rose-200 flex items-center justify-center
                `}
                  onClick={handleImageTwoInput}
               >
                  <MdOutlineDeleteSweep className='w-6 h-6 text-rose-400' />
               </div>
               {/* {isHover && (
                <div
                   className='w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center'
                   onClick={() => setImageSrc(null)}
                >
                   <MdOutlineDeleteSweep className='w-6 h-6 text-rose-400' />
                </div>
             )} */}
            </div>
         ) : (
            <label
               for='dropzone-file'
               className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
            >
               <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <svg
                     aria-hidden='true'
                     className='w-10 h-10 mb-3 text-gray-400'
                     fill='none'
                     stroke='currentColor'
                     viewBox='0 0 24 24'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                     ></path>
                  </svg>
                  <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                     <span className='font-semibold'>Click to upload</span> or
                     drag and drop
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                     SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
               </div>
               <input
                  id='dropzone-file'
                  type='file'
                  accept='image/*'
                  onChange={e => handleFileChange(e, 'team_two_image_src')}
                  className='hidden'
               />
            </label>
         )}
      </div>
   );

   const onSubmit = data => {
      console.log('Data :', data);
   };

   return (
      <DashboardLayout>
         <div className='px-8 py-4'>
            <div className='flex flex-row items-center mb-6 divide-y-1 divide-gray-400'>
               <h3 className='text-xl text-gray-800 font-bold'>Edit</h3>
               <Breadcumbs
                  srcIcon={AiOutlineHome}
                  rootLabel='Live Matches'
                  rootHref='/manage/live'
                  currentLabel='Edit'
                  currentHref='/manage/live/edit'
               />
            </div>
            <form
               className='flex flex-col gap-8'
               onSubmit={handleSubmit(onSubmit)}
            >
               <div className='flex flex-col gap-4'>
                  <div className=' flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                     <h4 className='text-lg text-gray-800 font-semibold'>
                        Match Information
                     </h4>
                     <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div className='col-span-2 lg:col-span-1'>
                           <Input
                              label='Match Title'
                              id='title'
                              required
                              register={register}
                              errors={errors}
                              nameW={title}
                              setValue={setValue}
                              defaultValue={defaultData?.title}
                           />
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                           <DatePickerInput
                              label='Date'
                              id='time'
                              required
                              type='date'
                              register={register}
                              errors={errors}
                              nameW={time}
                              setValue={setValue}
                              defaultValue={
                                 defaultData &&
                                 format(
                                    new Date(defaultData?.time),
                                    'yyyy-MM-dd'
                                 )
                              }
                           />
                        </div>
                     </div>
                     <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div className='col-span-2 lg:col-span-1'>
                           <Input
                              label='Fixure Id'
                              id='fixture_id'
                              required
                              register={register}
                              errors={errors}
                              nameW={fixture_id}
                              setValue={setValue}
                              defaultValue={defaultData?.fixture_id}
                           />
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                           <Select
                              label='Status'
                              option={StatusOptions}
                              register={register}
                              id='status'
                              required={true}
                              errors={errors}
                              setValue={setValue}
                              defaultValue={
                                 defaultData?.status === true
                                    ? 'Active'
                                    : 'Inactive'
                              }
                           />
                        </div>
                     </div>
                  </div>
               </div>
               <div className='flex flex-col gap-4'>
                  <div className='grid grid-cols-2 gap-6'>
                     <div className='col-span-2 lg:col-span-1 flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                        <h4 className='text-lg text-gray-800 font-semibold'>
                           Team One Information
                        </h4>
                        <div className='w-full'>
                           <Input
                              label='Name'
                              register={register}
                              id='team_one_name'
                              required={true}
                              errors={errors}
                              nameW={team_one_name}
                              setValue={setValue}
                              defaultValue={defaultData?.team_one_name}
                           />
                        </div>
                        <div className='w-full'>
                           <Select
                              label='Image Type'
                              option={ImageTypeOptions}
                              register={register}
                              id='team_one_image'
                              required={true}
                              errors={errors}
                              nameW={team_one_image}
                              imgBody={team_one_imageBody}
                              imgUrl={teamOneImageUrl}
                              setValue={setValue}
                              defaultValue={defaultData?.team_one_image}
                              flag='team_one_image'
                           />
                        </div>
                     </div>
                     <div className='col-span-2 lg:col-span-1 flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                        <h4 className='text-lg text-gray-800 font-semibold'>
                           Team Two Information
                        </h4>
                        <div className='w-full'>
                           <Input
                              label='Name'
                              register={register}
                              id='team_two_name'
                              required={true}
                              errors={errors}
                              nameW={team_two_name}
                              setValue={setValue}
                              defaultValue={defaultData?.team_two_name}
                           />
                        </div>
                        <div className='w-full'>
                           <Select
                              label='Image Type'
                              option={ImageTypeOptions}
                              register={register}
                              id='team_two_image'
                              required={true}
                              errors={errors}
                              nameW={team_two_image}
                              imgBody={team_two_imageBody}
                              imgUrl={teamTwoImageUrl}
                              setValue={setValue}
                              defaultValue={defaultData?.team_two_image}
                              flag='team_two_image'
                           />
                        </div>
                     </div>
                  </div>
               </div>
               <div className='flex flex-col gap-4'>
                  <div className='relative flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                     <h4 className='text-lg text-gray-800 font-semibold'>
                        Streaming Source
                     </h4>

                     {/* Streaming UI  */}

                     {/* {[...dataArray].map((_, index) => {
                        console.log('Index: ', index);
                     })} */}

                     {/* {[...Array(dataLength)].map((_, index) => {
                        //console.log('Index: ', index);
                        return <div onClick={removeData}>{index}</div>;
                     })} */}

                     {[...Array(dataLength)].map((_, index) => (
                        <div
                           key={index}
                           className='my-4 grid grid-cols-1 lg:grid-cols-2 gap-6 ring-1 ring-gray-400 rounded-md px-8 py-6 relative'
                        >
                           {index > 0 && (
                              <button className='absolute right-8 top-4 flex items-center justify-center bg-teal-600 text-sm pp-2 w-10 h-10 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'>
                                 <MdOutlineDeleteSweep
                                    onClick={removeData}
                                    className='w-6 h-6'
                                 />
                              </button>
                           )}
                           <div className='pt-16 col-span-2 lg:col-span-1'>
                              <div className='flex flex-col gap-6'>
                                 <div className='w-full'>
                                    <Input
                                       type='text'
                                       label='Stream Title'
                                       id={`streaming_sources[${index}].stream_title`}
                                       required
                                       register={register}
                                       errors={errors}
                                       nameW={watch(
                                          `streaming_sources[${index}].stream_title`
                                       )}
                                       setValue={setValue}
                                       defaultValue={
                                          defaultData?.streaming_sources[index]
                                             ?.stream_title
                                       }
                                    />
                                 </div>
                                 <div className='w-full'>
                                    <TextArea
                                       label='Portrait Watermark(json)'
                                       id={`streaming_sources[${index}].portrait_watermark`}
                                       required
                                       register={register}
                                       errors={errors}
                                       nameW={portrait_watermark}
                                       topLabel='Portrait Watermark'
                                       setValue={setValue}
                                       defaultValue={
                                          defaultData?.streaming_sources[index]
                                             ?.portrait_watermark
                                       }
                                    />
                                 </div>
                                 <div className='w-full'>
                                    <TextArea
                                       label='Landscape Watermark(json)'
                                       id={`streaming_sources[${index}].landscape_watermark`}
                                       required
                                       register={register}
                                       errors={errors}
                                       nameW={landscape_watermark}
                                       topLabel='Landscape Watermark'
                                       setValue={setValue}
                                       defaultValue={
                                          defaultData?.streaming_sources[index]
                                             ?.landscape_watermark
                                       }
                                    />
                                 </div>
                                 <div className='w-full'>
                                    <Input
                                       label='Stream URL'
                                       type='text'
                                       id={`streaming_sources[${index}].stream_url`}
                                       required
                                       register={register}
                                       errors={errors}
                                       setValue={setValue}
                                       defaultValue={
                                          defaultData?.streaming_sources[index]
                                             ?.stream_url
                                       }
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className='pt-16 col-span-2 lg:col-span-1'>
                              <div className='flex flex-col gap-6'>
                                 <div className='w-full'>
                                    <Select
                                       label='Resulation'
                                       option={ResolutionOptions}
                                       id={`streaming_sources[${index}].resolution`}
                                       required
                                       register={register}
                                       errors={errors}
                                       setValue={setValue}
                                       defaultValue={
                                          defaultData?.streaming_sources[index]
                                             ?.resolution
                                       }
                                    />
                                 </div>
                                 <div className='w-full'>
                                    <Select
                                       label='Is Premium'
                                       option={PremiumOptions}
                                       id={`streaming_sources[${index}].is_premium`}
                                       required
                                       register={register}
                                       errors={errors}
                                       setValue={setValue}
                                       //    defaultValue={
                                       //     matchResult?.status === true ? 'Active' : 'Inactive'
                                       //  }
                                       defaultValue={
                                          defaultData?.streaming_sources[index]
                                             ?.is_premium === true
                                             ? 'Active'
                                             : 'Inactive'
                                       }
                                    />
                                 </div>
                                 <div className='w-full'>
                                    <Select
                                       label='Platform'
                                       option={PlatformOptions}
                                       id={`streaming_sources[${index}].platform`}
                                       required
                                       register={register}
                                       errors={errors}
                                       setValue={setValue}
                                       defaultValue={
                                          defaultData?.streaming_sources[index]
                                             ?.platform
                                       }
                                    />
                                 </div>
                                 <div className='w-full'>
                                    <Select
                                       label='Status'
                                       option={StatusOptions}
                                       id={`streaming_sources[${index}].stream_status`}
                                       required
                                       register={register}
                                       errors={errors}
                                       setValue={setValue}
                                       defaultValue={
                                          defaultData?.streaming_sources[index]
                                             ?.stream_status === true
                                             ? 'Active'
                                             : 'Inactive'
                                       }
                                    />
                                 </div>
                                 <div className='w-full'>
                                    <Select
                                       label='Stream Type'
                                       option={StreamTypeOptions}
                                       id={`streaming_sources[${index}].stream_type`}
                                       required
                                       register={register}
                                       errors={errors}
                                       nameW={watch(
                                          `streaming_sources[${index}].stream_type`
                                       )}
                                       index={index}
                                       setValue={setValue}
                                       defaultValue={
                                          defaultData?.streaming_sources[index]
                                             ?.stream_type
                                       }
                                       streamingKey={
                                          defaultData &&
                                          defaultData?.streaming_sources[index]
                                             ?.stream_key
                                       }
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className='pt-16 col-span-2'>
                              {watch(
                                 `streaming_sources[${index}].stream_type`
                              ) === 'Restricted' && (
                                 <StreamItemFields
                                    itemIndex={index}
                                    errors={errors}
                                    control={control}
                                    register={register}
                                    headers={
                                       defaultData?.streaming_sources[index]
                                          ?.headers
                                    }
                                    setValue={setValue}
                                 />
                              )}
                           </div>
                        </div>
                     ))}

                     {/* Streaming UI */}

                     <div className='my-4'>
                        <button
                           type='button'
                           // onClick={() => {

                           //    // append({
                           //    //    stream_title: '',
                           //    //    portrait_watermark: '',
                           //    //    landscape_watermark: '',
                           //    //    stream_url: '',
                           //    //    resolution: '',
                           //    //    is_premium: '',
                           //    //    platform: '',
                           //    //    stream_status: '',
                           //    //    stream_type: '',
                           //    //    stream_key: '',
                           //    //    headers: []
                           //    // });
                           // }}
                           onClick={handleAddMore}
                           className='absolute right-8 bottom-4 bg-teal-600 text-sm px-2 py-2 w-24 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'
                        >
                           Add More
                        </button>
                     </div>
                  </div>
               </div>
               <button type='submit'>submit</button>
            </form>
         </div>
      </DashboardLayout>
   );
};

export default UpdateMatch;

// 'use client';

// import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
// import {
//    ImageTypeOptions,
//    PlatformOptions,
//    PremiumOptions,
//    ResolutionOptions,
//    StatusOptions,
//    StreamTypeOptions
// } from '@/components/helper/selectOptions';
// import DatePickerInput from '@/components/Input/DatePicker';
// import Input from '@/components/Input/InputCom';
// import Select from '@/components/Input/Select';
// import TextArea from '@/components/Input/Textarea';
// import DashboardLayout from '@/components/layout/DashboardLayout';
// import { useGetSingleMatchQuery } from '@/features/api/apiSlice';
// import { format } from 'date-fns';
// import { useState } from 'react';
// import { useFieldArray, useForm } from 'react-hook-form';
// import { AiOutlineHome } from 'react-icons/ai';
// import { MdOutlineDeleteSweep } from 'react-icons/md';

// //Custom Component
// const StreamItemFields = ({
//    itemIndex,
//    control,
//    errors,
//    register,
//    setValue
// }) => {
//    const { fields, append, remove } = useFieldArray({
//       name: `streaming_sources[${itemIndex}].headers`,
//       control
//    });

//    return (
//       <>
//          <div className='w-full flex flex-col gap-12'>
//             {JSON.parse(fields).length > 0 &&
//                JSON.parse(fields)?.map((field, i) => (
//                   <div
//                      key={field.id}
//                      className='w-full relative flex flex-col gap-2'
//                   >
//                      {i > 0 && (
//                         <button
//                            onClick={() => remove(i)}
//                            className='absolute right-0 -top-10 flex items-center justify-center bg-teal-600 text-sm p-1 w-8 h-8 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'
//                         >
//                            <MdOutlineDeleteSweep className='w-6 h-6' />
//                         </button>
//                      )}
//                      <div className='w-full md:gap-6 md:flex md:items-center md:justify-between'>
//                         <div className='w-full'>
//                            <Input
//                               type='text'
//                               label='Name'
//                               id={`streaming_sources[${itemIndex}].headers[${i}].name`}
//                               required
//                               register={register}
//                               errors={errors}
//                               setValue={setValue}
//                               defaultValue={field?.name}
//                            />
//                         </div>
//                         <div className='w-full'>
//                            <Input
//                               type='text'
//                               label='Value'
//                               id={`streaming_sources[${itemIndex}].headers[${i}].value`}
//                               required
//                               register={register}
//                               errors={errors}
//                               setValue={setValue}
//                               defaultValue={field?.value}
//                            />
//                         </div>
//                      </div>
//                   </div>
//                ))}
//             <div className='my-4 relative'>
//                <button
//                   type='button'
//                   onClick={() => append({})}
//                   className='absolute right-0 bottom-0 bg-teal-600 text-sm px-2 py-2 w-24 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'
//                >
//                   Add
//                </button>
//             </div>
//          </div>
//       </>
//    );
// };

// //Main Component
// const UpdateMatch = ({ matchId }) => {
//    const [isHover, setIsHover] = useState(true);
//    const [imageOneSrc, setImageOneSrc] = useState(null);
//    const [imageTwoSrc, setImageTwoSrc] = useState(null);
//    const [fileOne, setFileOne] = useState(null);
//    const [fileTwo, setFileTwo] = useState(null);
//    const [teamoneUrl, setTeamoneUrl] = useState('');
//    const [teamtwoUrl, setTeamtwoUrl] = useState('');

//    const { data: getMatchData } = useGetSingleMatchQuery(matchId);

//    const defaultData = getMatchData?.data;
//    console.log('defaultData', defaultData);
//    //    console.log(format(new Date(defaultData?.time), 'yyyy-MM-dd'));

//    const {
//       register,
//       handleSubmit,
//       formState,
//       control,
//       watch,
//       setValue,
//       reset
//    } = useForm({
//       defaultValues: {
//          streaming_sources: [
//             {
//                stream_title: '',
//                portrait_watermark: '',
//                landscape_watermark: '',
//                stream_url: '',
//                resolution: '',
//                is_premium: '',
//                platform: '',
//                stream_status: '',
//                stream_type: '',
//                stream_key: '',
//                headers: []
//             }
//          ]
//       }
//    });

//    const { errors } = formState;

//    const title = watch('title');
//    const time = watch('time');
//    const fixture_id = watch('fixture_id');
//    const team_one_name = watch('team_one_name');
//    const team_two_name = watch('team_two_name');
//    const portrait_watermark = watch('portrait_watermark');
//    const landscape_watermark = watch('landscape_watermark');
//    const team_one_image = watch('team_one_image');
//    const team_two_image = watch('team_two_image');
//    // const team_one_url = watch('team_one_url');
//    // const team_two_url = watch('team_two_url');

//    const streaming_sources = defaultData?.streaming_sources;

//    const { fields, append, remove } = useFieldArray({
//       name: `${streaming_sources}`,
//       control
//    });

//    console.log('Fields', fields);

//    const handleFileChange = (event, imgSrc) => {
//       const file = event.target.files[0];
//       console.log('file', file);
//       if (imgSrc === 'team_one_image_src') {
//          setFileOne(event.target.files[0]);
//          if (event.target.files.length !== 0) {
//             setImageOneSrc(URL.createObjectURL(event.target.files[0]));
//          }
//       }
//       if (imgSrc === 'team_two_image_src') {
//          setFileTwo(event.target.files[0]);
//          if (event.target.files.length !== 0) {
//             setImageTwoSrc(URL.createObjectURL(event.target.files[0]));
//          }
//       }
//    };

//    const handleImageOneInput = () => {
//       setImageOneSrc(null);
//    };

//    const handleImageTwoInput = () => {
//       setImageTwoSrc(null);
//    };

//    const teamOneImageUrl = (
//       <div className='w-full flex flex-col gap-2'>
//          <div className='relative h-11 w-full min-w-[200px]'>
//             <input
//                id='teamTwo'
//                required
//                value={teamoneUrl}
//                onChange={e => setTeamoneUrl(e.target.value)}
//                className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
//                placeholder=' '
//                type='text'
//             />
//             <label
//                for='teamtwo'
//                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
//             >
//                Image Url
//             </label>
//          </div>
//          {teamoneUrl.length > 0 && (
//             <div className='w-full h-[256px] rounded-md relative'>
//                <img
//                   src={teamoneUrl}
//                   alt='Image Preview'
//                   className='w-2/3 h-2/3 object-contain rounded-md'
//                   // onMouseEnter={onMouseEnterPreview}
//                   // onMouseLeave={onMouseLeavePreview}
//                />
//             </div>
//          )}

//          {/* {teamoneUrl.length === 0 && (
//           <div className='py-2 text-rose-400 text-sm font-semibold'>
//              Team Two Image Url is required
//           </div>
//        )} */}
//       </div>
//    );

//    const teamTwoImageUrl = (
//       <div className='w-full flex flex-col gap-2'>
//          <div className='relative h-11 w-full min-w-[200px]'>
//             <input
//                id='teamTwo'
//                required
//                value={teamtwoUrl}
//                onChange={e => setTeamtwoUrl(e.target.value)}
//                className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
//                placeholder=' '
//                type='text'
//             />
//             <label
//                for='teamtwo'
//                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
//             >
//                Image Url
//             </label>
//          </div>

//          {teamtwoUrl.length > 0 && (
//             <div className='w-full h-[256px] rounded-md relative'>
//                <img
//                   src={teamtwoUrl}
//                   alt='Image Preview'
//                   className='w-2/3 h-2/3 object-contain rounded-md'
//                   // onMouseEnter={onMouseEnterPreview}
//                   // onMouseLeave={onMouseLeavePreview}
//                />
//             </div>
//          )}

//          {/* {teamoneUrl.length < 1 && (
//           <div className='py-2 text-rose-400 text-sm font-semibold'>
//              Team Two Image Url is required
//           </div>
//        )} */}
//       </div>
//    );

//    const team_one_imageBody = (
//       <div className='w-full pt-2'>
//          {/* <input
//           type='file'
//           accept='image/*'
//           onChange={e => handleFileChange(e, 'team_one_image_src')}
//        /> */}
//          {/* Display Image Preview */}

//          {/* {defaultData?.team_one_image && (
//             <img
//                src={defaultData?.team_one_image}
//                alt='Image Preview'
//                className='w-full h-auto rounded-md'
//                // onMouseEnter={onMouseEnterPreview}
//                // onMouseLeave={onMouseLeavePreview}
//             />
//          )} */}

//          {imageOneSrc ? (
//             <div className='w-full h-64 rounded-md relative'>
//                <img
//                   src={imageOneSrc}
//                   alt='Image Preview'
//                   className='flex items-center justify-center w-full h-64 rounded-md'
//                   // onMouseEnter={onMouseEnterPreview}
//                   // onMouseLeave={onMouseLeavePreview}
//                />
//                <div
//                   // className={`absolute right-2 top-2 cursor-pointer w-10 h-10 rounded-md bg-gray-200
//                   // ${isHover ? 'flex items-center justify-center' : 'hidden'}`}
//                   className={`absolute right-2 top-2 cursor-pointer w-10 h-10 rounded-md bg-rose-200 flex items-center justify-center
//                 `}
//                   onClick={handleImageOneInput}
//                >
//                   <MdOutlineDeleteSweep className='w-6 h-6 text-rose-400' />
//                </div>
//                {/* {isHover && (
//                 <div
//                    className='w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center'
//                    onClick={() => setImageSrc(null)}
//                 >
//                    <MdOutlineDeleteSweep className='w-6 h-6 text-rose-400' />
//                 </div>
//              )} */}
//             </div>
//          ) : (
//             <label
//                for='dropzone-file'
//                className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
//             >
//                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
//                   <svg
//                      aria-hidden='true'
//                      className='w-10 h-10 mb-3 text-gray-400'
//                      fill='none'
//                      stroke='currentColor'
//                      viewBox='0 0 24 24'
//                      xmlns='http://www.w3.org/2000/svg'
//                   >
//                      <path
//                         stroke-linecap='round'
//                         stroke-linejoin='round'
//                         stroke-width='2'
//                         d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
//                      ></path>
//                   </svg>
//                   <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
//                      <span className='font-semibold'>Click to upload</span> or
//                      drag and drop
//                   </p>
//                   <p className='text-xs text-gray-500 dark:text-gray-400'>
//                      SVG, PNG, JPG or GIF (MAX. 800x400px)
//                   </p>
//                </div>
//                <input
//                   id='dropzone-file'
//                   type='file'
//                   accept='image/*'
//                   onChange={e => handleFileChange(e, 'team_one_image_src')}
//                   className='hidden'
//                />
//             </label>
//          )}
//       </div>
//    );

//    const team_two_imageBody = (
//       <div className='w-full pt-2'>
//          {/* <input
//           type='file'
//           accept='image/*'
//           onChange={e => handleFileChange(e, 'team_two_image_src')}
//        /> */}
//          {/* Display Image Preview */}

//          {/* {defaultData?.team_two_image && (
//             <img
//                src={defaultData?.team_two_image}
//                alt='Image Preview'
//                className='w-full h-auto rounded-md'
//                // onMouseEnter={onMouseEnterPreview}
//                // onMouseLeave={onMouseLeavePreview}
//             />
//          )} */}

//          {imageTwoSrc ? (
//             <div className=' w-full h-64 rounded-md relative'>
//                <img
//                   src={imageTwoSrc}
//                   alt='Image Preview'
//                   className='flex items-center justify-center w-full h-64 rounded-md'
//                   // onMouseEnter={onMouseEnterPreview}
//                   // onMouseLeave={onMouseLeavePreview}
//                />
//                <div
//                   // className={`absolute right-2 top-2 cursor-pointer w-10 h-10 rounded-md bg-gray-200
//                   // ${isHover ? 'flex items-center justify-center' : 'hidden'}`}
//                   className={`absolute right-2 top-2 cursor-pointer w-10 h-10 rounded-md bg-rose-200 flex items-center justify-center
//                 `}
//                   onClick={handleImageTwoInput}
//                >
//                   <MdOutlineDeleteSweep className='w-6 h-6 text-rose-400' />
//                </div>
//                {/* {isHover && (
//                 <div
//                    className='w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center'
//                    onClick={() => setImageSrc(null)}
//                 >
//                    <MdOutlineDeleteSweep className='w-6 h-6 text-rose-400' />
//                 </div>
//              )} */}
//             </div>
//          ) : (
//             <label
//                for='dropzone-file'
//                className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
//             >
//                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
//                   <svg
//                      aria-hidden='true'
//                      className='w-10 h-10 mb-3 text-gray-400'
//                      fill='none'
//                      stroke='currentColor'
//                      viewBox='0 0 24 24'
//                      xmlns='http://www.w3.org/2000/svg'
//                   >
//                      <path
//                         stroke-linecap='round'
//                         stroke-linejoin='round'
//                         stroke-width='2'
//                         d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
//                      ></path>
//                   </svg>
//                   <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
//                      <span className='font-semibold'>Click to upload</span> or
//                      drag and drop
//                   </p>
//                   <p className='text-xs text-gray-500 dark:text-gray-400'>
//                      SVG, PNG, JPG or GIF (MAX. 800x400px)
//                   </p>
//                </div>
//                <input
//                   id='dropzone-file'
//                   type='file'
//                   accept='image/*'
//                   onChange={e => handleFileChange(e, 'team_two_image_src')}
//                   className='hidden'
//                />
//             </label>
//          )}
//       </div>
//    );

//    const onSubmit = data => {
//       console.log('Data :', data);
//    };

//    console.log('Fields :', fields);

//    return (
//       <DashboardLayout>
//          <div className='px-8 py-4'>
//             <div className='flex flex-row items-center mb-6 divide-y-1 divide-gray-400'>
//                <h3 className='text-xl text-gray-800 font-bold'>Edit</h3>
//                <Breadcumbs
//                   srcIcon={AiOutlineHome}
//                   rootLabel='Live Matches'
//                   rootHref='/manage/live'
//                   currentLabel='Edit'
//                   currentHref='/manage/live/edit'
//                />
//             </div>
//             <form
//                className='flex flex-col gap-8'
//                onSubmit={handleSubmit(onSubmit)}
//             >
//                <div className='flex flex-col gap-4'>
//                   <div className=' flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
//                      <h4 className='text-lg text-gray-800 font-semibold'>
//                         Match Information
//                      </h4>
//                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
//                         <div className='col-span-2 lg:col-span-1'>
//                            <Input
//                               label='Match Title'
//                               id='title'
//                               required
//                               register={register}
//                               errors={errors}
//                               nameW={title}
//                               setValue={setValue}
//                               defaultValue={defaultData?.title}
//                            />
//                         </div>
//                         <div className='col-span-2 lg:col-span-1'>
//                            <DatePickerInput
//                               label='Date'
//                               id='time'
//                               required
//                               type='date'
//                               register={register}
//                               errors={errors}
//                               nameW={time}
//                               setValue={setValue}
//                               defaultValue={
//                                  defaultData &&
//                                  format(
//                                     new Date(defaultData?.time),
//                                     'yyyy-MM-dd'
//                                  )
//                               }
//                            />
//                         </div>
//                      </div>
//                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
//                         <div className='col-span-2 lg:col-span-1'>
//                            <Input
//                               label='Fixure Id'
//                               id='fixture_id'
//                               required
//                               register={register}
//                               errors={errors}
//                               nameW={fixture_id}
//                               setValue={setValue}
//                               defaultValue={defaultData?.fixture_id}
//                            />
//                         </div>
//                         <div className='col-span-2 lg:col-span-1'>
//                            <Select
//                               label='Status'
//                               option={StatusOptions}
//                               register={register}
//                               id='status'
//                               required={true}
//                               errors={errors}
//                               setValue={setValue}
//                               defaultValue={
//                                  defaultData?.status === true
//                                     ? 'Active'
//                                     : 'Inactive'
//                               }
//                            />
//                         </div>
//                      </div>
//                   </div>
//                </div>
//                <div className='flex flex-col gap-4'>
//                   <div className='grid grid-cols-2 gap-6'>
//                      <div className='col-span-2 lg:col-span-1 flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
//                         <h4 className='text-lg text-gray-800 font-semibold'>
//                            Team One Information
//                         </h4>
//                         <div className='w-full'>
//                            <Input
//                               label='Name'
//                               register={register}
//                               id='team_one_name'
//                               required={true}
//                               errors={errors}
//                               nameW={team_one_name}
//                               setValue={setValue}
//                               defaultValue={defaultData?.team_one_name}
//                            />
//                         </div>
//                         <div className='w-full'>
//                            <Select
//                               label='Image Type'
//                               option={ImageTypeOptions}
//                               register={register}
//                               id='team_one_image'
//                               required={true}
//                               errors={errors}
//                               nameW={team_one_image}
//                               imgBody={team_one_imageBody}
//                               imgUrl={teamOneImageUrl}
//                               setValue={setValue}
//                               defaultValue={defaultData?.team_one_image}
//                               flag='team_one_image'
//                            />
//                         </div>
//                      </div>
//                      <div className='col-span-2 lg:col-span-1 flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
//                         <h4 className='text-lg text-gray-800 font-semibold'>
//                            Team Two Information
//                         </h4>
//                         <div className='w-full'>
//                            <Input
//                               label='Name'
//                               register={register}
//                               id='team_two_name'
//                               required={true}
//                               errors={errors}
//                               nameW={team_two_name}
//                               setValue={setValue}
//                               defaultValue={defaultData?.team_two_name}
//                            />
//                         </div>
//                         <div className='w-full'>
//                            <Select
//                               label='Image Type'
//                               option={ImageTypeOptions}
//                               register={register}
//                               id='team_two_image'
//                               required={true}
//                               errors={errors}
//                               nameW={team_two_image}
//                               imgBody={team_two_imageBody}
//                               imgUrl={teamTwoImageUrl}
//                               setValue={setValue}
//                               defaultValue={defaultData?.team_two_image}
//                               flag='team_two_image'
//                            />
//                         </div>
//                      </div>
//                   </div>
//                </div>
//                <div className='flex flex-col gap-4'>
//                   <div className='relative flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
//                      <h4 className='text-lg text-gray-800 font-semibold'>
//                         Streaming Source
//                      </h4>

//                      {/* Streaming UI  */}

//                      {fields?.map((field, index) => (
//                         <div
//                            key={index}
//                            className='my-4 grid grid-cols-1 lg:grid-cols-2 gap-6 ring-1 ring-gray-400 rounded-md px-8 py-6 relative'
//                         >
//                            {index > 0 && (
//                               <button
//                                  onClick={() => remove(index)}
//                                  className='absolute right-8 top-4 flex items-center justify-center bg-teal-600 text-sm pp-2 w-10 h-10 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'
//                               >
//                                  <MdOutlineDeleteSweep className='w-6 h-6' />
//                               </button>
//                            )}
//                            <div className='pt-16 col-span-2 lg:col-span-1'>
//                               <div className='flex flex-col gap-6'>
//                                  <div className='w-full'>
//                                     <Input
//                                        type='text'
//                                        label='Stream Title'
//                                        id={`streaming_sources[${index}].stream_title`}
//                                        required
//                                        register={register}
//                                        errors={errors}
//                                        nameW={watch(
//                                           `streaming_sources[${index}].stream_title`
//                                        )}
//                                        setValue={setValue}
//                                        defaultValue={field?.stream_title}
//                                     />
//                                  </div>
//                                  <div className='w-full'>
//                                     <TextArea
//                                        label='Portrait Watermark(json)'
//                                        id={`streaming_sources[${index}].portrait_watermark`}
//                                        required
//                                        register={register}
//                                        errors={errors}
//                                        nameW={portrait_watermark}
//                                        topLabel='Portrait Watermark'
//                                        setValue={setValue}
//                                        defaultValue={field?.portrait_watermark}
//                                     />
//                                  </div>
//                                  <div className='w-full'>
//                                     <TextArea
//                                        label='Landscape Watermark(json)'
//                                        id={`streaming_sources[${index}].landscape_watermark`}
//                                        required
//                                        register={register}
//                                        errors={errors}
//                                        nameW={landscape_watermark}
//                                        topLabel='Landscape Watermark'
//                                        setValue={setValue}
//                                        defaultValue={field?.landscape_watermark}
//                                     />
//                                  </div>
//                                  <div className='w-full'>
//                                     <Input
//                                        label='Stream URL'
//                                        type='text'
//                                        id={`streaming_sources[${index}].stream_url`}
//                                        required
//                                        register={register}
//                                        errors={errors}
//                                        setValue={setValue}
//                                        defaultValue={field?.stream_url}
//                                     />
//                                  </div>
//                               </div>
//                            </div>
//                            <div className='pt-16 col-span-2 lg:col-span-1'>
//                               <div className='flex flex-col gap-6'>
//                                  <div className='w-full'>
//                                     <Select
//                                        label='Resulation'
//                                        option={ResolutionOptions}
//                                        id={`streaming_sources[${index}].resolution`}
//                                        required
//                                        register={register}
//                                        errors={errors}
//                                        setValue={setValue}
//                                        defaultValue={field?.resolution}
//                                     />
//                                  </div>
//                                  <div className='w-full'>
//                                     <Select
//                                        label='Is Premium'
//                                        option={PremiumOptions}
//                                        id={`streaming_sources[${index}].is_premium`}
//                                        required
//                                        register={register}
//                                        errors={errors}
//                                        setValue={setValue}
//                                        //    defaultValue={
//                                        //     matchResult?.status === true ? 'Active' : 'Inactive'
//                                        //  }
//                                        defaultValue={
//                                           field?.is_premium === true
//                                              ? 'Active'
//                                              : 'Inactive'
//                                        }
//                                     />
//                                  </div>
//                                  <div className='w-full'>
//                                     <Select
//                                        label='Platform'
//                                        option={PlatformOptions}
//                                        id={`streaming_sources[${index}].platform`}
//                                        required
//                                        register={register}
//                                        errors={errors}
//                                        setValue={setValue}
//                                        defaultValue={field?.platform}
//                                     />
//                                  </div>
//                                  <div className='w-full'>
//                                     <Select
//                                        label='Status'
//                                        option={StatusOptions}
//                                        id={`streaming_sources[${index}].stream_status`}
//                                        required
//                                        register={register}
//                                        errors={errors}
//                                        setValue={setValue}
//                                        defaultValue={
//                                           field?.stream_status === true
//                                              ? 'Active'
//                                              : 'Inactive'
//                                        }
//                                     />
//                                  </div>
//                                  <div className='w-full'>
//                                     <Select
//                                        label='Stream Type'
//                                        option={StreamTypeOptions}
//                                        id={`streaming_sources[${index}].stream_type`}
//                                        required
//                                        register={register}
//                                        errors={errors}
//                                        nameW={watch(
//                                           `streaming_sources[${index}].stream_type`
//                                        )}
//                                        index={index}
//                                        setValue={setValue}
//                                        defaultValue={field?.stream_type}
//                                        streamingKey={field?.stream_key}
//                                     />
//                                  </div>
//                               </div>
//                            </div>
//                            <div className='pt-16 col-span-2'>
//                               {watch(
//                                  `streaming_sources[${index}].stream_type`
//                               ) === 'Restricted' && (
//                                  <StreamItemFields
//                                     itemIndex={index}
//                                     errors={errors}
//                                     control={control}
//                                     register={register}
//                                     // headers={
//                                     //    defaultData?.streaming_sources[index]
//                                     //       ?.headers
//                                     // }
//                                     setValue={setValue}
//                                  />
//                               )}
//                            </div>
//                         </div>
//                      ))}

//                      {/* Streaming UI */}

//                      <div className='my-4'>
//                         <button
//                            type='button'
//                            onClick={() => {
//                               append({
//                                  stream_title: '',
//                                  portrait_watermark: '',
//                                  landscape_watermark: '',
//                                  stream_url: '',
//                                  resolution: '',
//                                  is_premium: '',
//                                  platform: '',
//                                  stream_status: '',
//                                  stream_type: '',
//                                  stream_key: '',
//                                  headers: []
//                               });
//                            }}
//                            className='absolute right-8 bottom-4 bg-teal-600 text-sm px-2 py-2 w-24 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'
//                         >
//                            Add More
//                         </button>
//                      </div>
//                   </div>
//                </div>
//                <button type='submit'>submit</button>
//             </form>
//          </div>
//       </DashboardLayout>
//    );
// };

// export default UpdateMatch;
