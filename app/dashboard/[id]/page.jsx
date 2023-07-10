'use client';

import SearchCountry from '@/components/Input/SearchCountry';
import { useForm } from 'react-hook-form';

const SelectComponent = () => {
   const { register, setValue, formState } = useForm();
   const { errors } = formState;
   const defaultValue = [
      { label: 'Brunei Darussalam', value: 'BN' },

      { label: 'Bulgaria', value: 'BG' },

      { label: 'Bhutan', value: 'BT' }
   ];
   return (
      <div>
         <SearchCountry
            id='country-select'
            required={true}
            register={register}
            errors={errors}
            defaultValue={defaultValue}
            setValue={setValue}
         />
      </div>
   );
};

export default SelectComponent;
