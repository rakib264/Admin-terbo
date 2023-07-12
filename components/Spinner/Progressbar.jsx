const Progressbar = ({ loadingState }) => {
   const progressPercentage = loadingState === true ? 100 : 0;

   return (
      <div className='flex-start flex h-2 w-full overflow-hidden rounded bg-blue-gray-50 font-sans text-xs font-medium'>
         <div
            class='flex h-full items-baseline justify-center overflow-hidden break-all bg-cyan-600 text-white'
            style={{ width: `${progressPercentage}%` }}
         >
            {progressPercentage} Completed
         </div>
      </div>
   );
};

export default Progressbar;
