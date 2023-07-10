import axios from 'axios';
import { useState } from 'react';

const UploadForm = () => {
   const [file, setFile] = useState(null);
   const [filename, setFilename] = useState('');
   const [imgSrc, setImgSrc] = useState('');

   const handleFileChange = event => {
      setFile(event.target.files[0]);
      setFilename(event.target.files[0].name);
   };

   const handleSubmit = async event => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'o5xbjuuy');

      try {
         const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dlcti0s8p/image/upload',
            formData
         );
         console.log(response);
         setImgSrc(response?.data?.secure_url);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className='flex items-center justify-center w-full'>
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
                  onChange={handleFileChange}
                  className='hidden'
               />
            </label>
         </div>
         <div>
            {imgSrc && (
               <img
                  src={imgSrc}
                  alt='img'
                  className='w-40 h-32 object-cover rounded-md'
               />
            )}
         </div>
         <button className='m-4 bg-cyan-600 p-2 rounded-md' type='submit'>
            Upload
         </button>
      </form>
   );
};

export default UploadForm;
