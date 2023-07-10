'use client';

import { useState } from 'react';

export default function DemoUpload({ register, id }) {
   const [image, setImage] = useState(null);
   const [createObjectURL, setCreateObjectURL] = useState(null);

   //    const uploadToClient = event => {
   //       if (event.target.files && event.target.files[0]) {
   //          const i = event.target.files[0];

   //          setImage(i);
   //          console.log(image);

   //          setCreateObjectURL(URL.createObjectURL(i));
   //          console.log('createObjectURL', createObjectURL);
   //       }
   //    };

   // const uploadToServer = async (event) => {
   //   const body = new FormData();
   //   body.append("file", image);
   //   const response = await fetch("/api/file", {
   //     method: "POST",
   //     body
   //   });
   // };

   return (
      <div>
         <div>
            <img src={createObjectURL} />
            <h4>Select Image</h4>
            <input type='file' name='myImage' id={id} {...register(id)} />
            <button type='submit'>Submit</button>
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
