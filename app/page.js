'use client';

import ClientOnly from '@/components/client/clientOnly';
import MyFormComponent from '@/components/demo3';
import {
   ImageTypeOptions,
   ResolutionOptions
} from '@/components/helper/selectOptions';
import Select from '@/components/Input/Select';
import DashboardLayout from '@/components/layout/DashboardLayout';

import UploadForm from '@/components/newUpload';
import Progressbar from '@/components/Spinner/Progressbar';
import {
   useGetAllMatchQuery,
   useGetSingleMatchQuery
} from '@/features/api/apiSlice';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// const columns = ['Id', 'Name', 'Email', 'Phone'];

// const entities = [
//    {
//       id: 1,
//       name: 'John',
//       email: `john@example.com`,
//       phone: '123-456-09'
//    },
//    {
//       id: 2,
//       name: 'Rone',
//       email: `rone@example.com`,
//       phone: '123-456-09'
//    },
//    {
//       id: 3,
//       name: 'Kalam',
//       email: `kalam@example.com`,
//       phone: '123-456-09'
//    },
//    {
//       id: 4,
//       name: 'Hasan',
//       email: `hasan@example.com`,
//       phone: '123-456-09'
//    },
//    {
//       id: 5,
//       name: 'Rihab',
//       email: `rihab@example.com`,
//       phone: '123-456-09'
//    },
//    {
//       id: 6,
//       name: 'Shinu',
//       email: `shinu@example.com`,
//       phone: '123-456-09'
//    }
// ];

// const list = [
//    {
//       name: 'list 1'
//    },
//    {
//       name: 'list 2'
//    },
//    {
//       name: 'list 3'
//    },
//    {
//       name: 'list 4'
//    },
//    {
//       name: 'list 5'
//    },
//    {
//       name: 'list 6'
//    }
// ];

export default function Dashboard() {
   const [isOpen, setIsOpen] = useState(false);
   // const [allMatch, { data }] = useAllMatchMutation();
   const { data: matchEntities, isSuccess, isError } = useGetAllMatchQuery();
   const { data: getMatchData } = useGetSingleMatchQuery(
      '64a657feaaa20313573e4c1e'
   );

   const result = matchEntities?.data;

   const status = false;

   console.log('Match Data: ', result);
   console.log('Singlke Match Data: ', getMatchData);

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

   const team_one_image = watch('team_one_image');

   const handleClick = () => {
      setIsOpen(prevState => !prevState);
   };

   // const handleMatch = () => {
   //    allMatch();
   // };

   // const dropDownData = [
   //    {
   //       id: 0,
   //       icon: BiCommentEdit,
   //       label: 'Edit'
   //    },
   //    {
   //       id: 1,
   //       icon: RiDeleteBin3Line,
   //       label: 'Delete'
   //    },
   //    {
   //       id: 2,
   //       icon: GrClone,
   //       label: 'Clone'
   //    }
   // ];

   const onSubmit = data => {
      console.log('Data: ', data);
   };

   const matchResult = {
      fixture_id: '45678',
      id: '64a657feaaa20313573e4c1e',
      status: false,
      team_one_image:
         'https://res.cloudinary.com/dlcti0s8p/image/upload/v1688623101/pubskzwfh8ihnhxr3pem.webp',
      team_one_name: 'demo3',
      team_two_image:
         'https://www.duir.ac.bd/wp-content/uploads/2016/03/DU-logo.jpg',
      team_two_name: 'deom4',
      time: '2023-07-13T00:00:00.000Z',
      title: 'Demo'
   };

   const initialState = {
      title: 'sdcd',
      teams: [
         {
            team_name: 'hgasvhxv',
            players: [
               {
                  name: 'sdcd',
                  age: 'dxcsc'
               },
               {
                  name: 'sdcd',
                  age: 'dxcsc'
               }
            ]
         },
         {
            team_name: 'dsvcd',
            players: [
               {
                  name: 'dcd',
                  age: 'dxcsc'
               },
               {
                  name: 'dwcfd',
                  age: 'dxcsc'
               }
            ]
         }
      ]
   };

   const option = [
      {
         id: 0,
         name: 'OneSignal'
      },
      {
         id: 1,
         name: 'FCM'
      }
   ];

   const fetchData = async () => {
      const data = await axios.get('https://turbosport.onrender.com/settings');
      console.log(data);
   };

   const defaultValue = '';

   return (
      <ClientOnly>
         <DashboardLayout>
            Dashboard
            <div>
               <MyFormComponent />
            </div>
            <div>
               <UploadForm />
            </div>
            <div>
               {/* <button onClick={handleMatch}>Get All Match</button> */}
            </div>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
               <div>
                  <div className='col-span-2 lg:col-span-1'>
                     <Input
                        label='Match Title'
                        id='title'
                        required
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        defaultValue={matchResult?.title}
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
                        setValue={setValue}
                        defaultValue={format(
                           new Date(matchResult?.time),
                           'yyyy-MM-dd'
                        )}
                     />
                  </div>
                  <div className='w-full'>
                     <Select
                        label='Status'
                        option={StatusOptions}
                        id='status'
                        required
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        defaultValue={
                           matchResult?.status === true ? 'Active' : 'Inactive'
                        }
                     />
                  </div>
                  <div className='w-full'>
                     <TextArea
                        label='Portrait Watermark(json)'
                        id={`port`}
                        required
                        register={register}
                        errors={errors}
                        topLabel='Portrait Watermark'
                        setValue={setValue}
                        defaultValue={matchResult?.title}
                     />
                  </div>
               </div>
               <div className='invisible'>Hello</div>
               <button type='submit'>Submit</button>
            </form> */}
            <div>
               <select className='select w-full rounded-md border-[1px] border-gray-300  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:outline-0 disabled:border-0 bg-white shadow-sm disabled:bg-blue-gray-50'>
                  <option
                     value={
                        defaultValue.length > 0
                           ? defaultValue
                           : option.length > 0 && option[0]?.name
                     }
                     selected
                  >
                     {defaultValue > 0
                        ? defaultValue
                        : option.length > 0 && option[0]?.name}
                  </option>
                  {option?.map(optionItem => (
                     <option key={optionItem?.id} value={option.name}>
                        {optionItem?.name}
                     </option>
                  ))}
               </select>

               <Select
                  label='Resulation'
                  option={ResolutionOptions}
                  id='resolution'
                  required
                  register={register}
                  errors={errors}
                  defaultValue='bnhj'
                  setValue={setValue}
               />
            </div>
            <button type='button' onClick={fetchData}>
               Get Data
            </button>
            <div className='py-32 px-24'>
               <div className='w-full'>
                  <Select
                     label='Image Type'
                     option={ImageTypeOptions}
                     register={register}
                     id='team_one_image'
                     required={true}
                     errors={errors}
                     nameW={team_one_image}
                     // imgBody={team_one_imageBody}
                     // imgUrl={teamOneImageUrl}
                     setValue={setValue}
                     // defaultValue={defaultData?.team_one_image}
                     flag='team_one_image'
                  />
               </div>
            </div>
            <div className='py-8'>
               <Progressbar />
            </div>
         </DashboardLayout>
      </ClientOnly>
   );
}

// 'use client';
// import { useState } from 'react';

// // const defaultStreamingSources = [
// //    {
// //       stream_title: '',
// //       portrait_watermark: '',
// //       landscape_watermark: '',
// //       stream_url: '',
// //       resolution: '',
// //       is_premium: '',
// //       platform: '',
// //       stream_status: '',
// //       stream_type: '',
// //       stream_key: '',
// //       headers: []
// //    }
// // ];

// const MyComponent = () => {
//    // ...

//    const [streamingSources, setStreamingSources] = useState([
//       {
//          stream_title: '',
//          portrait_watermark: '',
//          headers: []
//       }
//    ]);

//    const handleAddStreamingSource = () => {
//       setStreamingSources([
//          ...streamingSources,
//          {
//             stream_title: '',
//             portrait_watermark: '',

//             headers: []
//          }
//       ]);
//    };

//    const handleRemoveStreamingSource = index => {
//       const updatedStreamingSources = [...streamingSources];
//       updatedStreamingSources.splice(index, 1);
//       setStreamingSources(updatedStreamingSources);
//    };

//    // const handleStreamingSourceChange = (event, index, field) => {
//    //    const updatedStreamingSources = [...streamingSources];
//    //    updatedStreamingSources[index][field] = event.target.value;
//    //    setStreamingSources(updatedStreamingSources);
//    // };

//    const handleStreamingSourceChange = (event, index, field) => {
//       const updatedStreamingSources = [...streamingSources];

//       if (field === 'headers') {
//          updatedStreamingSources[index][field] = event.target.value.split(','); // Split the input value into an array
//       } else {
//          updatedStreamingSources[index][field] = event.target.value;
//       }

//       setStreamingSources(updatedStreamingSources);
//    };

//    return (
//       <div>
//          {streamingSources.map((source, index) => (
//             <div key={index}>
//                <input
//                   type='text'
//                   value={source.stream_title}
//                   placeholder='title'
//                   onChange={e =>
//                      handleStreamingSourceChange(e, index, 'stream_title')
//                   }
//                />
//                <input
//                   type='text'
//                   value={source.portrait_watermark}
//                   placeholder='water'
//                   onChange={e =>
//                      handleStreamingSourceChange(e, index, 'portrait_watermark')
//                   }
//                />
//                <input
//                   type='text'
//                   placeholder='headers'
//                   value={source.headers.join(',')} // Join the headers array into a string
//                   onChange={e =>
//                      handleStreamingSourceChange(e, index, 'headers')
//                   }
//                />
//                {/* Add additional input fields for other properties */}
//                <button onClick={() => handleRemoveStreamingSource(index)}>
//                   Remove
//                </button>
//             </div>
//          ))}
//          <button onClick={handleAddStreamingSource}>
//             Add Streaming Source
//          </button>
//       </div>
//    );
// };

// export default MyComponent;
