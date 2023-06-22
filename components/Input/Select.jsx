const Select = ({ label, option }) => {
   return (
      <select className='select w-full rounded-md border-1 border-gray-300  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-cyan-500 focus:outline-0 disabled:border-0 bg-white shadow-sm disabled:bg-blue-gray-50'>
         <option disabled selected>
            {label}
         </option>
         {option?.map(optionItem => (
            <option key={optionItem?.id}>{optionItem?.name}</option>
         ))}
      </select>
   );
};

export default Select;
