'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import ClientOnly from '@/components/client/clientOnly';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';

// const matchColumns = [
//    'Fixure Id',
//    'Team One',
//    'Team Two',
//    'Title & Time',
//    'Status',
//    'Action'
// ];

// const matchData = [
//    {
//       id: 1,
//       fixture_id: 234,
//       team_one_name: 'Team One',
//       team_two_name: 'Team Two',
//       time: '2023-06-12',
//       title: 'PSG VS Real',
//       status: 'Active'
//    },
//    {
//       id: 1,
//       fixture_id: 235,
//       team_one_name: 'Team One',
//       team_two_name: 'Team Two',
//       time: '2023-06-12',
//       title: 'PSG VS Real',
//       status: 'Active'
//    },
//    {
//       id: 1,
//       fixture_id: 236,
//       team_one_name: 'Team One',
//       team_two_name: 'Team Two',
//       time: '2023-06-12',
//       title: 'PSG VS Real',
//       status: 'Active'
//    },
//    {
//       id: 1,
//       fixture_id: 237,
//       team_one_name: 'Team One',
//       team_two_name: 'Team Two',
//       time: '2023-06-12',
//       title: 'PSG VS Real',
//       status: 'Active'
//    },
//    {
//       id: 1,
//       fixture_id: 238,
//       team_one_name: 'Team One',
//       team_two_name: 'Team Two',
//       time: '2023-06-12',
//       title: 'PSG VS Real',
//       status: 'Active'
//    },
//    {
//       id: 1,
//       fixture_id: 239,
//       team_one_name: 'Team One',
//       team_two_name: 'Team Two',
//       time: '2023-06-12',
//       title: 'PSG VS Real',
//       status: 'Active'
//    },
//    {
//       id: 1,
//       fixture_id: 240,
//       team_one_name: 'Team One',
//       team_two_name: 'Team Two',
//       time: '2023-06-12',
//       title: 'PSG VS Real',
//       status: 'Active'
//    }
// ];

const Highlights = () => {
   //    useEffect(() => {
   //       if (matchEntities?.length > 0) {
   //          toast.success('Match Data Fetched Successfully');
   //       }
   //       // try {
   //       //    allMatch();
   //       //    toast.success('Match Data Fetched Successfully');
   //       // } catch (err) {
   //       //    console.log('Error: ', err);
   //       //    toast.error('Something went wrong fetching matches');
   //       // }
   //    }, []);

   //    console.log('Match data: ', matchEntities);

   return (
      <ClientOnly>
         <DashboardLayout>
            <div className='px-8 py-4 relative'>
               <div className='flex flex-row items-center mb-6 divide-y-1 divide-gray-400'>
                  <h3 className='text-xl text-gray-800 font-bold'>Add New</h3>
                  <Breadcumbs srcIcon={AiOutlineHome} rootLabel='Highlights' />
               </div>
               <Link className='absolute right-4 top-4' href='/highlights/add'>
                  <button className='bg-sky-800 px-3 py-2 rounded-md text-sm text-white'>
                     Add New
                  </button>
               </Link>
            </div>
         </DashboardLayout>
      </ClientOnly>
   );
};

export default Highlights;
