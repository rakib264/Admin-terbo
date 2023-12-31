import { BsSearch } from 'react-icons/bs';

const SearchInput = ({ label, type = 'text' }) => {
   return (
      <div className='w-full'>
         <div className='relative h-11 w-full min-w-[200px]'>
            <input
               className='peer h-full w-full rounded-md border-0 shadow-sm border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
               placeholder=' '
               type={type}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
               {label}
            </label>
            <button
               className='absolute top-0 right-0 bottom-0 z-[2] rounded-r border-l-2 border-l-gray-200 hover:bg-teal-500 hover:text-white  focus:bg-teal-500 focus:text-white px-4 py-2 text-xs font-medium uppercase text-gray-500 transition duration-150 ease-in-out  hover:bg-opacity-1 focus:outline-none focus:ring-0'
               type='button'
               id='button-addon3'
               data-te-ripple-init
            >
               <BsSearch size={24} />
            </button>
         </div>
      </div>
   );
};

export default SearchInput;
