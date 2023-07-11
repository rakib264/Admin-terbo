'use client';
//Global Package Import
import { useForm } from 'react-hook-form';
import { AiOutlineHome } from 'react-icons/ai';

//Components Imports
import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';

import {
   StatusOptions,
   ThumbnailImage,
   VideoType
} from '@/components/helper/selectOptions';
import Input from '@/components/Input/InputCom';
import Select from '@/components/Input/Select';
import TextArea from '@/components/Input/Textarea';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAddSearchFixtureHighlightsMutation } from '@/features/api/apiSlice';

//Main Component
export default function AddHighlights() {
   const [addSearchFixtureHighlights, { data, isSuccess, isError }] =
      useAddSearchFixtureHighlightsMutation();

   console.log('Data: ', data);

   const {
      register,
      handleSubmit,
      formState,
      control,
      watch,
      setValue,
      reset
   } = useForm();

   const { errors } = formState;

   // console.log('Data :', data);

   const title = watch('title');
   const short_description = watch('short_description');
   const video_type = watch('video_type');
   const fixture_id = watch('fixture_id');

   // console.log('Fix: ', fixture_id);

   const api_key = process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN;
   // console.log('API key', api_key);

   const handleFixtureHighlights = e => {
      console.log('v', fixture_id);
      if (fixture_id !== null) {
         addSearchFixtureHighlights({
            fixture_id: 18804442,
            api_key: process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN
         });
      }
   };

   const onSubmit = async data => {
      console.log('DATA:', data);
   };

   return (
      <DashboardLayout>
         <div className='px-8 py-4'>
            <div className='flex flex-row items-center mb-6 divide-y-1 divide-gray-400'>
               <h3 className='text-xl text-gray-800 font-bold'>Add New</h3>
               <Breadcumbs
                  srcIcon={AiOutlineHome}
                  rootLabel='Highlights'
                  rootHref='/highlights'
                  currentLabel='Create'
                  currentHref='/highlights/add'
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
                     <div className='grid grid-cols-1'>
                        <div className='col-span-1'>
                           <Input
                              label='Title'
                              id='title'
                              required
                              register={register}
                              errors={errors}
                              nameW={title}
                           />
                        </div>
                     </div>
                     <div className='grid grid-cols-1'>
                        <div className='col-span-1'>
                           <TextArea
                              label='Short Description'
                              id={`short_description`}
                              required
                              register={register}
                              errors={errors}
                              nameW={short_description}
                              topLabel='Short Description'
                           />
                        </div>
                     </div>
                     <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div className='col-span-2 lg:col-span-1'>
                           <Select
                              label='Video Type'
                              option={VideoType}
                              register={register}
                              id='video_type'
                              required={true}
                              errors={errors}
                              setValue={setValue}
                           />
                        </div>
                        {video_type === 'Sportmonk' && (
                           <div className='col-span-2 lg:col-span-1'>
                              <Input
                                 label='Fixture Id'
                                 id='fixture_id'
                                 required
                                 register={register}
                                 errors={errors}
                                 onChange={handleFixtureHighlights}
                              />
                           </div>
                        )}
                        {video_type === 'Youtube' && (
                           <div className='col-span-2 lg:col-span-1'>
                              <div className='w-full flex flex-col gap-2'>
                                 <label htmlFor={id}>{label}</label>
                                 <div className='relative h-11 w-full min-w-[200px]'>
                                    <input
                                       // id={id}
                                       // {...register(id, {
                                       //    required: `${
                                       //       id?.charAt(0).toUpperCase() + id?.slice(1)
                                       //    } is required`
                                       // })}
                                       id='fixture_id'
                                       onChange={e => onChange(e)}
                                       // defaultValue={defaultValue}
                                       className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 ${
                                          nameW?.length > 0 &&
                                          'border-t-transparent'
                                       } bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                                       placeholder=' '
                                    />
                                    <label
                                       htmlFor='htmlFor'
                                       className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                    >
                                       Fixture
                                    </label>
                                 </div>
                                 {errors[id] && (
                                    <div className='py-2 text-rose-400 text-sm font-semibold'>
                                       {errors[id]?.message}
                                    </div>
                                 )}
                              </div>
                           </div>
                        )}
                     </div>

                     <div className='grid grid-cols-1'>
                        <div className='col-span-1'>
                           <Select
                              label='Thumbnail Image Type'
                              option={ThumbnailImage}
                              register={register}
                              id='thumbnail_image_type'
                              required={true}
                              errors={errors}
                              setValue={setValue}
                           />
                        </div>
                     </div>

                     <div className='grid grid-cols-1'>
                        <div className='col-span-1'>
                           <Select
                              label='Status'
                              option={StatusOptions}
                              register={register}
                              id='status'
                              required={true}
                              errors={errors}
                              setValue={setValue}
                           />
                        </div>
                     </div>
                  </div>
               </div>
               <button
                  type='submit'
                  className='bg-cyan-600 px-4 py-2 text-white text-md rounded-md'
               >
                  Save
               </button>
            </form>
         </div>
      </DashboardLayout>
   );
}
