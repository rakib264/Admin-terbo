import { useState } from 'react';
import { BiLogIn, BiMenuAltLeft } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FaExpeditedssl, FaUserEdit } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import ImageCom from '../Image/Image';

// profile menu component
const profileMenuItems = [
   {
      label: 'My Profile',
      icon: CgProfile
   },
   {
      label: 'Edit Profile',
      icon: FaUserEdit
   },
   {
      label: 'Change Password',
      icon: FaExpeditedssl
   },
   {
      label: 'Sign Out',
      icon: BiLogIn
   }
];

export default function TopBar({ sidebarOpen, setSidebarOpen }) {
   const [menuIconRotate, setMenuIconRotate] = useState(false);

   return (
      <header
         className={`bg-gray-300 fixed w-full h-16 z-50 flex justify-between items-center transition-all duration-[500ms] ${
            sidebarOpen ? 'pl-56' : ''
         }`}
      >
         <div className='navbar bg-sky-900 px-4'>
            <div className='flex-1'>
               <button onClick={() => setSidebarOpen(!sidebarOpen)}></button>
               <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className='text-white font-semibold cursor-pointer shadow-sm shadow-sky-600 rounded-md p-2'
               >
                  <BiMenuAltLeft size={26} />
               </button>
            </div>
            <div className='flex-none'>
               <div className='dropdown dropdown-end '>
                  <div
                     tabIndex={0}
                     onClick={() => setMenuIconRotate(!menuIconRotate)}
                     className='w-[70px] h-[44px] focus:outline-none flex items-center 
                                gap-2 px-2 rounded-md transition shadow-sm shadow-sky-600
                                duration-150 cursor-pointer hover:opacity-70'
                  >
                     <div className='avatar online'>
                        <ImageCom
                           src='/assets/logo/avatar.jpeg'
                           alt='profile'
                           width='36'
                           height='36'
                           className='rounded-full border border-blue-500 p-0.5 transition-transform'
                        />
                     </div>
                     <FiChevronDown
                        className={`w-4 h-4 text-white transition-transform ${
                           menuIconRotate ? 'rotate-180' : ''
                        }`}
                     />
                  </div>
                  <ul
                     tabIndex={0}
                     className='menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded w-52'
                  >
                     {profileMenuItems.map(({ label, icon: Icon }, index) => {
                        return (
                           <div
                              key={index}
                              className={`flex items-center gap-3 rounded text-sm
                 hover:bg-gray-300 cursor-pointer px-2 py-2`}
                           >
                              <Icon className={`h-4 w-4 text-gray-900`} />

                              <div className='text-gray-900'>{label}</div>
                           </div>
                        );
                     })}
                  </ul>
               </div>
            </div>
         </div>
      </header>
   );
}
