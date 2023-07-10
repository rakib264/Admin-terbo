// 'use client';

// import { CldUploadWidget } from 'next-cloudinary';

// const Upload = () => {
//    const uploadPreset = 'zv7ophky';
//    return (
//       <CldUploadWidget uploadPreset={uploadPreset}>
//          {({ open }) => {
//             function handleOnClick(e) {
//                e.preventDefault();
//                open();
//             }
//             return (
//                <button className='button' onClick={handleOnClick}>
//                   Upload an Image
//                </button>
//             );
//          }}
//       </CldUploadWidget>
//    );
// };

// export default Upload;

'use client';

import { useState } from 'react';

export default function PrivatePage(props) {
   const [image, setImage] = useState(null);
   const [createObjectURL, setCreateObjectURL] = useState(null);

   const uploadToClient = event => {
      if (event.target.files && event.target.files[0]) {
         const i = event.target.files[0];

         setImage(i);
         console.log(image);

         setCreateObjectURL(URL.createObjectURL(i));
         console.log('createObjectURL', createObjectURL);
      }
   };

   // const uploadToServer = async (event) => {
   //   const body = new FormData();
   //   body.append("file", image);
   //   const response = await fetch("/api/file", {
   //     method: "POST",
   //     body
   //   });
   // };

   const team_two_imageBody = (
      <div className='w-full pt-2'>
         <input
            type='file'
            accept='image/*'
            onChange={e => handleFileChange(e, 'team_two_image_src')}
         />
         {/* Display Image Preview */}
         {/* {watch(`team_two_image_src`) && ( */}
         {/* {file && (
            <img
               src={URL.createObjectURL(watch(`team_two_image_src`))}
               alt='Image Preview'
               style={{ width: '100px', height: 'auto' }}
            />
         )} */}
      </div>
   );

   return (
      <div>
         <div>
            <img src={createObjectURL} />
            <h4>Select Image</h4>
            <input type='file' name='myImage' onChange={uploadToClient} />
            {/* <button
            className="btn btn-primary"
            type="submit"
            onClick={uploadToServer}
          >
            Send to server
          </button> */}
         </div>
      </div>
   );
}
