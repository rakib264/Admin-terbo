'use client';

import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
   return (
      <Toaster
         position='top-right'
         toastOptions={{
            className: 'custom-toast',
            style: {
               background: '#333',
               color: '#fff',
               borderRadius: '8px',
               padding: '16px',
               fontSize: '16px',
               boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'
            }
         }}
      />
   );
};

export default ToasterProvider;
