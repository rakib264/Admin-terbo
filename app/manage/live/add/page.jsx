import ClientOnly from '@/components/client/clientOnly';
import AddMatch from '@/components/manage/live/AddMatch';

const ManageLive = () => {
   return (
      <ClientOnly>
         <AddMatch />
      </ClientOnly>
   );
};

export default ManageLive;
