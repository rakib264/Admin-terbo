// import { useFieldArray, useForm } from 'react-hook-form';

// const MyFormComponent = () => {
//    const { control, handleSubmit, register, setValue, watch } = useForm();
//    const { fields, append, remove } = useFieldArray({
//       control,
//       name: 'streaming_sources'
//    });

//    // Handle form submission
//    const onSubmit = data => {
//       console.log(data); // The form data will be logged here
//       // You can perform further actions, like API calls or saving to the database.
//    };

//    // Custom file input component for image uploads
//    const handleFileChange = (event, index) => {
//       const file = event.target.files[0];
//       setValue(`streaming_sources[${index}].team_image`, file);
//    };

//    return (
//       <form onSubmit={handleSubmit(onSubmit)}>
//          {/* ... Other fields ... */}

//          {/* Streaming Sources */}
//          {fields.map((item, index) => (
//             <div key={item.id}>
//                {/* Image Upload */}
//                <input
//                   type='file'
//                   accept='image/*'
//                   onChange={e => handleFileChange(e, index)}
//                />
//                {/* Display Image Preview */}
//                {watch(`streaming_sources[${index}].team_image`) && (
//                   <img
//                      src={URL.createObjectURL(
//                         watch(`streaming_sources[${index}].team_image`)
//                      )}
//                      alt={`Stream ${index} Image Preview`}
//                      style={{ width: '100px', height: 'auto' }}
//                   />
//                )}

//                {/* Remove Button */}
//                <button type='button' onClick={() => remove(index)}>
//                   Remove Stream
//                </button>
//             </div>
//          ))}

//          {/* Add New Stream Button */}
//          <button type='button' onClick={() => append({})}>
//             Add New Stream
//          </button>

//          {/* Submit button */}
//          <button type='submit'>Submit</button>
//       </form>
//    );
// };

// export default MyFormComponent;
