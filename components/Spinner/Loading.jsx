import { ImSpinner9 } from 'react-icons/im';

const Loading = () => {
   return (
      <div className='flex justify-center'>
         <div className='flex items-center gap-2'>
            <ImSpinner9 className='animate-spin text-4xl text-cyan-700' />
            <div className='text-lg text-cyan-600'>Loading...</div>
         </div>
      </div>
   );
};

export default Loading;
