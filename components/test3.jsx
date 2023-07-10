import { useForm } from 'react-hook-form';
import Input from './Input/InputCom';
import Select from './Input/Select';

export default function TestData() {
   const { register, handleSubmit } = useForm();
   const onSubmit = data => console.log(data);

   const option = [
      {
         id: 1,
         name: 'male'
      },
      {
         id: 2,
         name: 'female'
      },
      {
         id: 3,
         name: 'other'
      }
   ];

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='flex flex-col gap-4'>
            <Input
               label='MatchName'
               id='MatchName'
               required
               register={register}
            />
            <Input
               label='MatchTime'
               id='MatchTime'
               required
               register={register}
            />
            <Input
               label='TeamOneName'
               id='TeamOneName'
               required
               register={register}
            />
            <Input
               label='TeamTwoName'
               id='TeamTwoName'
               required
               register={register}
            />
            <Select
               label='Pick an option'
               register={register}
               id='Gender'
               required
               option={option}
            />

            {/* <select label='Name' register={register}>
            <option value='female'>female</option>
            <option value='male'>male</option>
            <option value='other'>other</option>
         </select> */}
            <input type='submit' />
         </div>
      </form>
   );
}
