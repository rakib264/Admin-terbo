'use client';

import MyTable from '@/components/table/Table';

const entitiesData = [
   { id: 1, name: 'John Doe', email: 'john@example.com' },
   { id: 2, name: 'rane Doe', email: 'rane@example.com' },
   { id: 3, name: 'John Doe', email: 'john@example.com' },
   { id: 4, name: 'rane Doe', email: 'jane@example.com' },
   { id: 5, name: 'John Doe', email: 'john@example.com' },
   { id: 6, name: 'tiger Doe', email: 'tiger@example.com' },
   { id: 7, name: 'John Doe', email: 'john@example.com' },
   { id: 8, name: 'Jane Doe', email: 'jane@example.com' }
];

const columns = ['Id', 'Name', 'Email', 'Phone'];

const Fixure = () => {
   return (
      <div className=''>
         <MyTable columns={columns} entities={entitiesData} />
      </div>
   );
};

export default Fixure;
