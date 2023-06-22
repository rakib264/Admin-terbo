'use client';

import DatePicker from '@/components/Input/DatePicker';
import Search from '@/components/Input/Search';
import TextArea from '@/components/Input/Textarea';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Dashboard() {
   return (
      <DashboardLayout>
         Dashboard
         <div className='flex flex-col gap-6'>
            <Search label='SEARCH' />
            <TextArea label='TextArea' />
            <DatePicker />
         </div>
      </DashboardLayout>
   );
}
