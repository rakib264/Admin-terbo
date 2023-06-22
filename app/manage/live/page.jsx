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
import Input from '@/components/Input/InputCom';
import Select from '@/components/Input/Select';
import TextArea from '@/components/Input/Textarea';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
// import { StatusOptions, PremiumOptions, ImageTypeOptions, PlatformOptions, ResoluitionOptions } from '@/components/helper/.'

export default function Dashboard() {
   const [streamCount, setStreamCount] = useState(1);
   const [stream, setStream] = useState({
      streamCount: 1,
      streamData: [
         {
            streamTitle: '',
            resolution: '',
            portraitWatermark: '',
            status: '',
            streamUrlLink: '',
            isPremium: '',
            platform: '',
            landscapeWatermarkL: '',
            streamType: ''
         }
      ]
   });

   const handleStreamingButton = () => {
      setStreamCount(prevState => prevState + 1);
   };

   const handleDecreaseStreaming = () => {
      if (streamCount > 1) {
         setStreamCount(prevState => prevState - 1);
      }
   };

   return (
      <DashboardLayout>
         <div className='px-8 py-4'>
            <div className='flex flex-row items-center mb-6 divide-y-1 divide-gray-400'>
               <h3 className='text-xl text-gray-800 font-bold'>Add New</h3>
               <Breadcumbs
                  srcIcon={AiOutlineHome}
                  rootLabel='Live Matches'
                  currentLabel='Create'
               />
            </div>
            <div className='flex flex-col gap-8'>
               <div className='flex flex-col gap-4'>
                  <div className=' flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                     <h4 className='text-lg text-gray-800 font-semibold'>
                        Match Information
                     </h4>
                     <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div className='col-span-2 lg:col-span-1'>
                           <Input label='Match Title' />
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                           <Input label='Match Time' />
                        </div>
                     </div>
                     <div className='w-full'>
                        <Select label='Status' option={StatusOptions} />
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
                           <Input label='Name' />
                        </div>
                        <div className='w-full'>
                           <Select
                              label='Image Type'
                              option={ImageTypeOptions}
                           />
                        </div>
                     </div>
                     <div className='col-span-2 lg:col-span-1 flex flex-col gap-6 bg-white rounded-md shadow-md z-40 shadow-gray-500 w-full h-auto px-6 py-4'>
                        <h4 className='text-lg text-gray-800 font-semibold'>
                           Team Two Information
                        </h4>
                        <div className='w-full'>
                           <Input label='Name' />
                        </div>
                        <div className='w-full'>
                           <Select
                              label='Image Type'
                              option={ImageTypeOptions}
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
                     {/* Streaming UI */}
                     {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 ring-1 ring-gray-400 rounded-md px-8 py-6 '>
                        <div className='col-span-2 lg:col-span-1'>
                           <div className='flex flex-col gap-6'>
                              <div className='w-full'>
                                 <Input label='Stream Title' />
                              </div>
                              <div className='w-full'>
                                 <Select
                                    label='Resulation'
                                    option={ResolutionOptions}
                                 />
                              </div>
                              <div className='w-full'>
                                 <TextArea label='Portrait Watermark(json)' />
                              </div>
                              <div className='w-full'>
                                 <Select
                                    label='Status'
                                    option={StatusOptions}
                                 />
                              </div>
                              <div className='w-full'>
                                 <Input label='Stream URL' />
                              </div>
                           </div>
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                           <div className='flex flex-col gap-6'>
                              <div className='w-full'>
                                 <Select
                                    label='Is Premium'
                                    option={PremiumOptions}
                                 />
                              </div>
                              <div className='w-full'>
                                 <Select
                                    label='Platform'
                                    option={PlatformOptions}
                                 />
                              </div>
                              <div className='w-full'>
                                 <TextArea label='Landscape Watermark(json)' />
                              </div>
                              <div className='w-full'>
                                 <Select
                                    label='Stream Type'
                                    option={StreamTypeOptions}
                                 />
                              </div>
                           </div>
                        </div>
                     </div> */}

                     <div className=''>
                        {[...Array(streamCount)].map((_, index) => (
                           <div className='my-4 grid grid-cols-1 lg:grid-cols-2 gap-6 ring-1 ring-gray-400 rounded-md px-8 py-6 relative'>
                              {index >= 1 && (
                                 <button
                                    onClick={handleDecreaseStreaming}
                                    className='absolute right-8 top-4 bg-teal-600 text-sm px-2 py-2 w-24 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'
                                 >
                                    Remove
                                 </button>
                              )}
                              <div className='pt-16 col-span-2 lg:col-span-1'>
                                 <div className='flex flex-col gap-6'>
                                    <div className='w-full'>
                                       <Input label='Stream Title' />
                                    </div>
                                    <div className='w-full'>
                                       <Select
                                          label='Resulation'
                                          option={ResolutionOptions}
                                       />
                                    </div>
                                    <div className='w-full'>
                                       <TextArea label='Portrait Watermark(json)' />
                                    </div>
                                    <div className='w-full'>
                                       <Select
                                          label='Status'
                                          option={StatusOptions}
                                       />
                                    </div>
                                    <div className='w-full'>
                                       <Input label='Stream URL' />
                                    </div>
                                 </div>
                              </div>
                              <div className='pt-16 col-span-2 lg:col-span-1'>
                                 <div className='flex flex-col gap-6'>
                                    <div className='w-full'>
                                       <Select
                                          label='Is Premium'
                                          option={PremiumOptions}
                                       />
                                    </div>
                                    <div className='w-full'>
                                       <Select
                                          label='Platform'
                                          option={PlatformOptions}
                                       />
                                    </div>
                                    <div className='w-full'>
                                       <TextArea label='Landscape Watermark(json)' />
                                    </div>
                                    <div className='w-full'>
                                       <Select
                                          label='Stream Type'
                                          option={StreamTypeOptions}
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>

                     {/* Streaming UI */}
                     <div className='my-4'>
                        <button
                           onClick={handleStreamingButton}
                           className='absolute right-8 bottom-4 bg-teal-600 text-sm px-2 py-2 w-24 rounded-md text-white shadow-sm shadow-gray-900 cursor-pointer hover:bg-teal-800 outline-none focus:outline-none'
                        >
                           Add More
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
}

// import React, { useState } from 'react';

// function MyComponent() {
//   const [elementCount, setElementCount] = useState(1);

//   const handleAddButtonClick = () => {
//     setElementCount(prevCount => prevCount + 1);
//   };

//   return (
//     <div>
//       <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 ring-1 ring-gray-400 rounded-md px-8 py-6'>
//         {[...Array(elementCount)].map((_, index) => (
//           <div className='col-span-2 lg:col-span-1' key={index}>
//             <div className='flex flex-col gap-6'>
//               <div className='w-full'>
//                 <Input label='Stream Title' />
//               </div>
//               {/* Add more fields as needed */}
//             </div>
//           </div>

//         ))}
//       </div>

//       <button onClick={handleAddButtonClick}>Add</button>
//     </div>
//   );
// }

// export default MyComponent;
