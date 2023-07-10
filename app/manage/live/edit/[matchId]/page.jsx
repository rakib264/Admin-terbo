import ClientOnly from '@/components/client/clientOnly';
import UpdateMatch from '@/components/manage/live/UpdateMatch';

const ManageLive = ({ params }) => {
   return (
      <ClientOnly>
         <UpdateMatch matchId={params?.matchId} />
      </ClientOnly>
   );
};

export default ManageLive;
