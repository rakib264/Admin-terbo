import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef, useMemo } from 'react';

import { BiBarcodeReader, BiNews } from 'react-icons/bi';
import { FaCcStripe, FaDollarSign, FaIoxhost, FaUsers } from 'react-icons/fa';
import { ImFileVideo, ImUserCheck } from 'react-icons/im';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoDesktopOutline, IoGrid, IoPlayCircle } from 'react-icons/io5';
import { LuFileVideo } from 'react-icons/lu';
import { MdAdminPanelSettings, MdCached } from 'react-icons/md';

const SideBar = forwardRef(({ sidebarOpen }, ref) => {
   const pathname = usePathname();
   const routes = useMemo(
      () => [
         {
            icon: IoDesktopOutline,
            label: 'Dashboard',
            active: pathname === '/dashboard',
            href: '/dashboard'
         },
         {
            icon: IoPlayCircle,
            label: 'Manage Live',
            active: pathname === '/manage/live',
            href: '/manage/live'
         },
         {
            icon: IoGrid,
            label: 'Manage App',
            active: pathname === '/manage/app',
            href: '/manage/app'
         },
         {
            icon: LuFileVideo,
            label: 'Fixures',
            active: pathname === '/fixures',
            href: '/fixures'
         },
         {
            icon: ImFileVideo,
            label: 'Highlights',
            active: pathname === '/highlights',
            href: '/highlights'
         },
         {
            icon: IoMdNotificationsOutline,
            label: 'Notifications',
            active: pathname === '/notifications',
            href: '/notifications'
         },
         {
            icon: FaUsers,
            label: 'Manage Users',
            active: pathname === '/users',
            href: '/users'
         },
         {
            icon: ImUserCheck,
            label: 'Manage Admin',
            active: pathname === '/admin',
            href: '/admin'
         },
         {
            icon: FaIoxhost,
            label: 'Subsscriptions',
            active: pathname === '/subscription',
            href: '/subscription'
         },
         {
            icon: BiBarcodeReader,
            label: 'Coupon Code',
            active: pathname === '/coupons',
            href: '/coupons'
         },
         ,
         {
            icon: FaDollarSign,
            label: 'Payments',
            active: pathname === '/payments',
            href: '/payments'
         },
         ,
         {
            icon: FaCcStripe,
            label: 'Stripe',
            active: pathname === '/stripe',
            href: '/stripe'
         },
         ,
         {
            icon: BiNews,
            label: 'News',
            active: pathname === '/news',
            href: '/news'
         },
         ,
         {
            icon: MdCached,
            label: 'Cache Clean',
            active: pathname === '/cache',
            href: '/cache'
         },
         ,
         {
            icon: MdAdminPanelSettings,
            label: 'Administration',
            active: pathname === '/adsettings',
            href: '/adsettings'
         }
      ],
      [pathname]
   );

   return (
      <aside
         ref={ref}
         className='fixed z-50 w-56 h-full bg-sky-900 shadow-sm transition-all ease-in-out duration-500 '
      >
         <div className='bg-sky-900 border-r-8 boder-white text-white text-lg font-bold sticky top-0 left-0 right-0 flex justify-center items-center h-16'>
            Turbo Sports
         </div>
         <div className='bg-sky-900 flex flex-col px-4 overflow-auto h-full'>
            {routes.map((route, index) => {
               const { label, icon: Icon, active, href } = route;
               return (
                  <Link href={href}>
                     <div
                        className={`flex flex-row items-center 
                                gap-3 px-4 py-3 text-white hover:bg-gray-500 hover:rounded
                                ${active && 'bg-gray-400 rounded-md my-1'}
                                `}
                     >
                        <Icon size={20} />
                        <div className='text-sm font-semibold truncate'>
                           {label}
                        </div>
                     </div>
                  </Link>
               );
            })}
            {/* <Link href="/">Manage Live</Link>
                <Link href="/account">Manage App</Link>
                <Link href="/billing">Fixture</Link> */}
         </div>
      </aside>
   );
});

SideBar.displayName = 'SideBar';

export default SideBar;
