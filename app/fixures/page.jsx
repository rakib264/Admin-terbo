'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import ClientOnly from '@/components/client/clientOnly';
import FixureComponent from '@/components/Fixures/page';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AiOutlineHome } from 'react-icons/ai';

// const entitiesData = [
//    { id: 1, name: 'rane Doe', email: 'rane@example.com', phone: '01828123264' },
//    { id: 2, name: 'John Doe', email: 'john@example.com', phone: '01828123264' },
//    { id: 3, name: 'John Doe', email: 'john@example.com', phone: '01828123264' },
//    { id: 4, name: 'rane Doe', email: 'jane@example.com', phone: '01828123264' },
//    { id: 5, name: 'John Doe', email: 'john@example.com', phone: '01828123264' },
//    {
//       id: 6,
//       name: 'tiger Doe',
//       email: 'tiger@example.com',
//       phone: '01828123264'
//    },
//    { id: 7, name: 'John Doe', email: 'john@example.com', phone: '01828123264' },
//    { id: 8, name: 'Jane Doe', email: 'jane@example.com', phone: '01828123264' },
//    { id: 9, name: 'rane Doe', email: 'rane@example.com', phone: '01828123264' },
//    {
//       id: 10,
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 11,
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 12,
//       name: 'rane Doe',
//       email: 'jane@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 13,
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 14,
//       name: 'rane Doe',
//       email: 'rane@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 15,
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 16,
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 17,
//       name: 'rane Doe',
//       email: 'jane@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 18,
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 19,
//       name: 'rane Doe',
//       email: 'rane@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 20,
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 21,
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '01828123264'
//    },
//    {
//       id: 22,
//       name: 'rane Doe',
//       email: 'jane@example.com',
//       phone: '01828123264'
//    },
//    { id: 23, name: 'John Doe', email: 'john@example.com', phone: '01828123264' }
// ];

// const columns = ['Id', 'Name', 'Email', 'Phone'];

const Fixure = () => {
   return (
      <ClientOnly>
         <DashboardLayout>
            <div className='flex flex-col gap-2'>
               <div className='flex flex-row items-center px-2 mb-2 divide-y-1 pt-8 divide-gray-400'>
                  <h3 className='text-xl text-gray-800 font-bold'>Fixures</h3>
                  <Breadcumbs srcIcon={AiOutlineHome} rootLabel='Fixures' />
               </div>
               <FixureComponent />
            </div>
         </DashboardLayout>
      </ClientOnly>
   );
};

export default Fixure;
