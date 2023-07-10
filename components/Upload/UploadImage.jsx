'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

const UploadImage = ({ value, onChange }) => {
   const uploadPreset = 'zv7ophky';
   console.log('value', value);

   const handleUpload = useCallback(
      result => {
         onChange(result.info.secure_url);
      },
      [onChange]
   );

   return (
      <CldUploadWidget
         onUpload={handleUpload}
         uploadPreset={uploadPreset}
         options={{
            maxFiles: 1
         }}
      >
         {({ open }) => {
            return (
               <div
                  onClick={() => open?.()}
                  className='relative border-2 border-dashed border-neutral-500 p-20 
                    flex flex-col items-center justify-center gap-2 
                    hover:opacity-80 cursor-pointer transition rounded-md'
               >
                  <div>
                     <TbPhotoPlus size={50} />
                  </div>
                  <div className='text-lg font-semibld'>Upload a photo</div>
                  {value && (
                     <div className='absolute inset-0 w-full h-full rounded-md'>
                        <Image
                           fill
                           src={value}
                           style={{ objectFit: 'cover' }}
                           alt='Uploaded photo'
                        />
                     </div>
                  )}
               </div>
            );
         }}
      </CldUploadWidget>
   );
};

export default UploadImage;
