'use client';

import Breadcumbs from '@/components/Breadcumbs/Breadcumbs';
import ClientOnly from '@/components/client/clientOnly';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MatchList from '@/components/manage/live/MatchListTable';
import Loading from '@/components/Spinner/Loading';
import Spinner from '@/components/Spinner/page';
import Progressbar from '@/components/Spinner/Progressbar';
import {
   useDeleteMatchMutation,
   useGetAllMatchQuery,
   useUpdateMatchStatusMutation
} from '@/features/api/apiSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineHome } from 'react-icons/ai';

const matchColumns = [
   'Fixure Id',
   'Team One',
   'Team Two',
   'Title & Time',
   'Status',
   'Action'
];

const matchData = [
   {
      id: 1,
      fixture_id: 234,
      team_one_name: 'Team One',
      team_two_name: 'Team Two',
      time: '2023-06-12',
      title: 'PSG VS Real',
      status: 'Active'
   },
   {
      id: 1,
      fixture_id: 235,
      team_one_name: 'Team One',
      team_two_name: 'Team Two',
      time: '2023-06-12',
      title: 'PSG VS Real',
      status: 'Active'
   },
   {
      id: 1,
      fixture_id: 236,
      team_one_name: 'Team One',
      team_two_name: 'Team Two',
      time: '2023-06-12',
      title: 'PSG VS Real',
      status: 'Active'
   },
   {
      id: 1,
      fixture_id: 237,
      team_one_name: 'Team One',
      team_two_name: 'Team Two',
      time: '2023-06-12',
      title: 'PSG VS Real',
      status: 'Active'
   },
   {
      id: 1,
      fixture_id: 238,
      team_one_name: 'Team One',
      team_two_name: 'Team Two',
      time: '2023-06-12',
      title: 'PSG VS Real',
      status: 'Active'
   },
   {
      id: 1,
      fixture_id: 239,
      team_one_name: 'Team One',
      team_two_name: 'Team Two',
      time: '2023-06-12',
      title: 'PSG VS Real',
      status: 'Active'
   },
   {
      id: 1,
      fixture_id: 240,
      team_one_name: 'Team One',
      team_two_name: 'Team Two',
      time: '2023-06-12',
      title: 'PSG VS Real',
      status: 'Active'
   }
];

const ManageLive = () => {
   const [loading, setLoading] = useState(false);

   const {
      data: matchEntities,
      isLoading,
      isSuccess,
      isError,
      refetch
   } = useGetAllMatchQuery();
   // const [allMatch, { data: matchEntities }] = useAllMatchMutation();
   //const [isOpen, setIsOpen] = useState(false);
   // const handleClick = () => {
   //    setIsOpen(prevState => !prevState);
   // };

   useEffect(() => {
      if (isLoading) {
         setLoading(true);
      }
      if (isSuccess) {
         setLoading(false);
         toast.success('Match Data Fetched Successfully');
      }
      // try {
      //    allMatch();
      //    toast.success('Match Data Fetched Successfully');
      // } catch (err) {
      //    console.log('Error: ', err);
      //    toast.error('Something went wrong fetching matches');
      // }
   }, [isLoading, isSuccess, toast, setLoading]);

   const [
      deleteMatch,
      {
         isLoading: isDeleteLoading,
         isSuccess: isDeleteSuccess,
         isError: isDeleteError
      }
   ] = useDeleteMatchMutation();

   useEffect(() => {
      if (isDeleteLoading) {
         setLoading(true);
      }
      if (isDeleteSuccess) {
         setLoading(false);
         refetch();
         toast.success('Match Deleted successfully');
      }
   }, [isDeleteLoading, isDeleteSuccess, toast, setLoading, refetch]);

   console.log('Match data: ', matchEntities);

   const [
      updateMatchStatus,
      { data, isSuccess: isStatusSuccess, isLoading: isStatusLoading }
   ] = useUpdateMatchStatusMutation();

   console.log(data);

   useEffect(() => {
      if (isStatusLoading) {
         setLoading(true);
      }
      if (isStatusSuccess) {
         setLoading(false);
         refetch();
         toast.success('Match Status updated');
      }
   }, [isStatusLoading, isStatusSuccess, setLoading, toast, refetch]);

   return (
      <ClientOnly>
         <DashboardLayout>
            <div className='px-8 py-4 relative'>
               <Progressbar loadingState={40} />
               <div className='flex flex-row items-center mb-6 divide-y-1 divide-gray-400'>
                  <h3 className='text-xl text-gray-800 font-bold'>
                     Match List
                  </h3>
                  <Breadcumbs
                     srcIcon={AiOutlineHome}
                     rootLabel='Live Matches'
                  />
               </div>
               <Link className='absolute right-4 top-4' href='/manage/live/add'>
                  <button className='bg-sky-800 px-3 py-2 rounded-md text-sm text-white'>
                     Add Match
                  </button>
               </Link>
               {loading ? (
                  <Loading />
               ) : (
                  <div className='py-4'>
                     {/* {data?.length > 0 && (
                     <MatchList columns={matchColumns} entities={data} />
                  )} */}
                     {matchEntities && matchEntities?.data?.length > 0 ? (
                        <MatchList
                           columns={matchColumns}
                           entities={matchEntities?.data}
                           deleteMatch={deleteMatch}
                           isDeleteSuccess={isDeleteSuccess}
                           updateMatchStatus={updateMatchStatus}
                        />
                     ) : (
                        <Spinner />
                     )}
                  </div>
               )}
            </div>
         </DashboardLayout>
      </ClientOnly>
   );
};

export default ManageLive;
