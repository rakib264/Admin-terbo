import ClientOnly from '@/components/client/clientOnly';
import AddHighlights from '@/components/highlights/AddHighlights';

const AddHighlight = () => {
   return (
      <ClientOnly>
         <AddHighlights />
      </ClientOnly>
   );
};

export default AddHighlight;
