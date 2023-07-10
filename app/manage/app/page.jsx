import ClientOnly from '@/components/client/clientOnly';
import AppSettings from '@/components/manage/app/page';

const ManageLive = () => {
   return (
      <ClientOnly>
         <AppSettings />
      </ClientOnly>
   );
};

export default ManageLive;
