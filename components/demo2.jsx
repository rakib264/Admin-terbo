import { useUploadImageMutation } from '../apiSlices/imageUpload'; // Import your API slice

const MyFormComponent = () => {
   // ... other form code ...

   const [uploadImage] = useUploadImageMutation(); // Initialize the image upload mutation

   // Custom file input component for image uploads
   const handleFileChange = async (event, index) => {
      const file = event.target.files[0];
      try {
         const imageData = new FormData();
         imageData.append('file', file);

         const response = await uploadImage(imageData);
         const imageUrl = response.data.imageUrl; // Replace 'imageUrl' with the key containing the image URL in the API response

         // Now you have the image URL, you can update your form state or component state as needed.
         // For example, you can store the image URL in the form data or in a state variable:
         setValue(`streaming_sources[${index}].team_image_url`, imageUrl);
      } catch (error) {
         console.error('Error uploading image:', error);
      }
   };

   // ... rest of the form code ...
};

export default MyFormComponent;
