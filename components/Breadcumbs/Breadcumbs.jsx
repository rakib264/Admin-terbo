const Breadcumbs = ({ srcIcon: Icon, rootLabel, currentLabel }) => {
   return (
      <div className='w-1/2 text-left'>
         <nav aria-label='breadcrumb' class='w-max'>
            <ol class='flex w-full flex-wrap items-center rounded-md bg-blue-gray-50 bg-opacity-60 py-2 px-4'>
               <li class='flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased transition-colors duration-300 hover:text-teal-500'>
                  <a class='opacity-60' href='#'>
                     <Icon size={24} />
                  </a>
                  <span class='pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased'>
                     /
                  </span>
               </li>
               <li class='flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased transition-colors duration-300 hover:text-teal-500'>
                  <a class='opacity-60' href='#'>
                     <span>{rootLabel}</span>
                  </a>
                  <span class='pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased'>
                     /
                  </span>
               </li>
               <li class='flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased transition-colors duration-300 hover:text-teal-500'>
                  <a
                     class='font-medium text-blue-gray-900 transition-colors hover:text-teal-500'
                     href='#'
                  >
                     {currentLabel}
                  </a>
               </li>
            </ol>
         </nav>
      </div>
   );
};

export default Breadcumbs;
