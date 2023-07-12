import { useRouter } from 'next/navigation';

const DropDownMenu = ({
   dropDownData,
   width,
   height,
   background,
   matchId,
   openModal,
   setIsOpen,
   handleDeleteMatch
}) => {
   const router = useRouter();

   // const deleteModal = (
   //    <div
   //       data-dialog-backdrop='dialog'
   //       data-dialog-backdrop-close='true'
   //       class='pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300'
   //    >
   //       <div
   //          data-dialog='dialog'
   //          class='relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl'
   //       >
   //          <div class='flex shrink-0 items-center p-4 font-sans text-2xl font-semibold leading-snug text-blue-gray-900 antialiased'>
   //             Its a simple dialog.
   //          </div>
   //          <div class='relative border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 p-4 font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased'>
   //             The key to more success is to have a lot of pillows. Put it this
   //             way, it took me twenty five years to get these plants, twenty
   //             five years of blood sweat and tears, and I&apos;m never giving
   //             up, I&apos;m just getting started. I&apos;m up to something. Fan
   //             luv.
   //          </div>
   //          <div class='flex shrink-0 flex-wrap items-center justify-end p-4 text-blue-gray-500'>
   //             <button
   //                data-ripple-dark='true'
   //                data-dialog-close='true'
   //                class='middle none center mr-1 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
   //             >
   //                Cancel
   //             </button>
   //             <button
   //                data-ripple-light='true'
   //                data-dialog-close='true'
   //                class='middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
   //             >
   //                Confirm
   //             </button>
   //          </div>
   //       </div>
   //    </div>
   // );

   const handleMatchAction = (e, props) => {
      const { matchId, label } = props;

      if (label === 'Delete') {
         setIsOpen(false);
         openModal();
         // handleDeleteMatch(matchId);

         // deleteMatch(matchId);
         // if (isSuccess === true) {
         //    toast.success('Match deleted successfully');
         // }
      }
      if (label === 'Edit') {
         setIsOpen(false);
         router.push(`/manage/live/edit/${matchId}`);
      }
      // } catch (err) {
      //    console.log('Error :', err);
      //    toast.error('Something went wrong on match deletion');
      // }
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
