import { useState } from 'react';
import { BiLogIn, BiMenuAltLeft } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FaExpeditedssl, FaUserEdit } from 'react-icons/fa';
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

// export default function TopBar({ sidebarOpen, setSidebarOpen }) {
//    const [menuIconRotate, setMenuIconRotate] = useState(false);

//    return (
//       <header
//          className={`bg-gray-300 fixed w-full h-16 z-50 flex justify-between items-center transition-all duration-[500ms] ${
//             sidebarOpen ? 'pl-56' : ''
//          }`}
//       >
//          <div className='navbar bg-sky-900 px-4'>
//             <div className='flex-1'>
//                <button onClick={() => setSidebarOpen(!sidebarOpen)}></button>
//                <button
//                   onClick={() => setSidebarOpen(!sidebarOpen)}
//                   className='text-white font-semibold cursor-pointer shadow-sm shadow-sky-600 rounded-md p-2'
//                >
//                   <BiMenuAltLeft size={26} />
//                </button>
//             </div>
//             <div className='flex-none'>
//                <div className='dropdown dropdown-end '>
//                   <div
//                      tabIndex={0}
//                      onClick={() => setMenuIconRotate(!menuIconRotate)}
//                      className='w-[70px] h-[44px] focus:outline-none flex items-center
//                                 gap-2 px-2 rounded-md transition shadow-sm shadow-sky-600
//                                 duration-150 cursor-pointer hover:opacity-70'
//                   >
//                      <div className='avatar online'>
//                         <ImageCom
//                            src='/assets/logo/avatar.jpeg'
//                            alt='profile'
//                            width='36'
//                            height='36'
//                            className='rounded-full border border-blue-500 p-0.5 transition-transform'
//                         />
//                      </div>
//                      <FiChevronDown
//                         className={`w-4 h-4 text-white transition-transform ${
//                            menuIconRotate ? 'rotate-180' : ''
//                         }`}
//                      />
//                   </div>
//                   <ul
//                      tabIndex={0}
//                      className='menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded w-52'
//                   >
//                      {profileMenuItems.map(({ label, icon: Icon }, index) => {
//                         return (
//                            <div
//                               key={index}
//                               className={`flex items-center gap-3 rounded text-sm
//                  hover:bg-gray-300 cursor-pointer px-2 py-2`}
//                            >
//                               <Icon className={`h-4 w-4 text-gray-900`} />

//                               <div className='text-gray-900'>{label}</div>
//                            </div>
//                         );
//                      })}
//                   </ul>
//                </div>
//             </div>
//          </div>
//       </header>
//    );
// }

export default function TopBar({ sidebarOpen, setSidebarOpen }) {
   const [menuIconRotate, setMenuIconRotate] = useState(false);

   return (
      <header
         className={`bg-gray-300 fixed w-full h-16 z-50 flex justify-between items-center transition-all duration-[500ms] ${
            sidebarOpen ? 'pl-56' : ''
         }`}
      >
         <div className='w-full flex items-center justify-between bg-sky-900 px-4'>
            <div className=''>
               <button onClick={() => setSidebarOpen(!sidebarOpen)}></button>
               <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className='text-white font-semibold cursor-pointer shadow-sm shadow-sky-600 rounded-md p-2'
               >
                  <BiMenuAltLeft size={26} />
               </button>
            </div>
            <div className=''>
               <div class='relative' data-te-dropdown-ref>
                  <button
                     class='flex items-center whitespace-nowrap rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                     type='button'
                     id='dropdownMenuButton1'
                     data-te-dropdown-toggle-ref
                     aria-expanded='false'
                     data-te-ripple-init
                     data-te-ripple-color='light'
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
                     <span class='ml-2 w-2'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 20 20'
                           fill='currentColor'
                           class='h-5 w-5'
                        >
                           <path
                              fill-rule='evenodd'
                              d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                              clip-rule='evenodd'
                           />
                        </svg>
                     </span>
                  </button>
                  <ul
                     class='absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block'
                     aria-labelledby='dropdownMenuButton1'
                     data-te-dropdown-menu-ref
                  >
                     {profileMenuItems.map(({ label, icon: Icon }, index) => {
                        return (
                           <li
                              key={index}
                              data-te-dropdown-item-ref
                              className={`flex items-center gap-3 rounded text-sm
                              w-full whitespace-nowrap bg-transparent px-4 py-2 font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600`}
                           >
                              <Icon className={`h-4 w-4 text-gray-900`} />

                              <div className='text-gray-900'>{label}</div>
                           </li>
                        );
                     })}
                  </ul>
               </div>
            </div>
         </div>
      </header>
   );
}
