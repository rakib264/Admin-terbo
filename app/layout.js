import ToasterProvider from '@/providers/page';
import { Inter } from 'next/font/google';
import 'tw-elements/dist/css/tw-elements.min.css';
import './globals.css';
import store, { Provider } from './store';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
   title: 'Turbo sports',
   description: ''
};

export default function RootLayout({ children }) {
   return (
      <html lang='en'>
         <body className={inter.className}>
            <Provider store={store}>
               <ToasterProvider />
               {children}
            </Provider>
         </body>
      </html>
   );
}
