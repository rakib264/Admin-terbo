'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import DatePicker from '@/components/test';

export default function Dashboard() {
   return (
      <DashboardLayout>
         Dashboard
         <div className='flex flex-col gap-6'>
            {/* <SearchInput label='SEARCH' />
            <TextArea label='TextArea' />
            <DatePicker /> */}
            <DatePicker />
         </div>
         {/* <DatePickerInput label='Date' type='date' /> */}
      </DashboardLayout>
   );
}
