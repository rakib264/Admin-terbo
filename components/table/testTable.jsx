import { useState } from 'react';

const SortableTable = () => {
   const [sortField, setSortField] = useState('');
   const [sortDirection, setSortDirection] = useState('asc');

   // Your table data goes here
   const tableData = [
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Smith', age: 32 },
      { id: 3, name: 'Alice Johnson', age: 28 }
      // ...
   ];

   const handleSort = field => {
      if (sortField === field) {
         // Reverse the sort direction if the same field is clicked again
         setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
         setSortField(field);
         setSortDirection('asc');
      }
   };

   const sortedData = [...tableData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
   });

   return (
      <table className='table-auto'>
         <thead>
            <tr>
               <th onClick={() => handleSort('id')}>ID</th>
               <th onClick={() => handleSort('name')}>Name</th>
               <th onClick={() => handleSort('age')}>Age</th>
            </tr>
         </thead>
         <tbody>
            {sortedData.map(item => (
               <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default SortableTable;
