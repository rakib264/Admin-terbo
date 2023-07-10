import Link from 'next/link';

const Breadcumbs = ({
   srcIcon: Icon,
   rootLabel,
   currentLabel,
   rootHref,
   currentHref
}) => {
   return (
      <div className='w-1/2 text-left'>
         <nav aria-label='breadcrumb' className='w-full'>
            <ol className='flex w-full flex-wrap items-center rounded-md bg-blue-gray-50 bg-opacity-60 px-4'>
               <li className='flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased transition-colors duration-300 hover:text-teal-500'>
                  <a className='opacity-60' href='#'>
                     <Icon className='w-5 h-5' />
                  </a>
                  <span className='pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased'>
                     /
                  </span>
               </li>
               <Link href={`${rootHref}`}>
                  <li className='flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased transition-colors duration-300 hover:text-teal-500'>
                     <a className='opacity-60' href='#'>
                        <span>{rootLabel}</span>
                     </a>
                     {currentLabel && (
                        <span className='pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased'>
                           /
                        </span>
                     )}
                  </li>
               </Link>
               {currentLabel && (
                  <Link href={`${currentHref}`}>
                     <li className='flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased transition-colors duration-300 hover:text-teal-500'>
                        <a
                           className='font-medium text-blue-gray-900 transition-colors hover:text-teal-500'
                           href='#'
                        >
                           {currentLabel}
                        </a>
                     </li>
                  </Link>
               )}
            </ol>
         </nav>
      </div>
   );
};

export default Breadcumbs;
