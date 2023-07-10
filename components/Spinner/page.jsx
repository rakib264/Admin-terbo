const Spinner = () => {
   return (
      <div className='bg-gray-200 w-full h-[40rem] flex justify-center items-center'>
         <div className='flex items-center gap-4'>
            <div className=' shadow-md rounded-xl relative'>
               <div className='rounded-full bg-sky-700 w-6 h-6 absolute -left-3 -top-3 animate-ping'></div>
               <div className='rounded-full bg-sky-700 w-6 h-6 absolute -left-3 -top-3'></div>
            </div>
            <div className='pl-2 text-sm text-sky-600 font-semibold'>
               Wait...
            </div>
         </div>
      </div>
   );
};

export default Spinner;
