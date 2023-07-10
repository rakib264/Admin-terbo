import { useDeleteMatchMutation } from '@/features/api/apiSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const DropDownMenu = ({ dropDownData, width, height, background, matchId }) => {
   const [deleteMatch, { isSuccess, isError }] = useDeleteMatchMutation();
   const router = useRouter();

   const handleMatchAction = (e, props) => {
      const { matchId, label } = props;

      try {
         if (label === 'Delete') {
            deleteMatch(matchId);
            if (isSuccess === true) {
               toast.success('Match deleted successfully');
            }
         }
         if (label === 'Edit') {
            router.push(`/manage/live/edit/${matchId}`);
         }
      } catch (err) {
         console.log('Error :', err);
         toast.error('Something went wrong on match deletion');
      }
   };

   return (
      <div
         className={`
         ${width ? 'h-[${width}]' : 'w-32'} 
    ${height ? 'h-[${height}]' : 'h-auto'} 
    ${background ? 'bg-[${background}]' : 'bg-white'} 
    px-2 py-2 rounded-md shadow  flex flex-col gap-2 transition-all duration-300 border-[1px] border-gray-200 
    `}
      >
         {dropDownData.map(({ id, icon: Icon, label }) => (
            <div
               onClick={e => handleMatchAction(e, { label, matchId })}
               key={id}
               className='flex items-center gap-2 hover:bg-gray-200 px-2 py-1 rounded-sm cursor-pointer '
            >
               <Icon className='w-4 h-4 text-gray-800 ' />
               <div>{label}</div>
            </div>
         ))}
      </div>
   );
};

export default DropDownMenu;
