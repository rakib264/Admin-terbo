'use client';

import { useFieldArray, useForm } from 'react-hook-form';

const PlayerFields = ({ teamIndex, control, errors, register }) => {
   const { fields, append, remove } = useFieldArray({
      control,
      name: `teams[${teamIndex}].players`
   });

   console.log('fields', fields);

   return (
      <>
         {fields.map((player, playerIndex) => (
            <div key={player.id}>
               {/* Player Name */}
               <input
                  type='text'
                  className='mt-2'
                  {...register(
                     `teams[${teamIndex}].players[${playerIndex}].name`,
                     { required: 'Player Name is required' }
                  )}
               />
               <p>
                  {
                     errors.teams?.[teamIndex]?.players?.[playerIndex]?.name
                        ?.message
                  }
               </p>

               {/* Player Age */}
               <input
                  type='text'
                  className='mt-2'
                  {...register(
                     `teams[${teamIndex}].players[${playerIndex}].age`,
                     { required: 'Player Age is required' }
                  )}
               />
               <p>
                  {
                     errors.teams?.[teamIndex]?.players?.[playerIndex]?.age
                        ?.message
                  }
               </p>

               <button type='button' onClick={() => remove(playerIndex)}>
                  Remove Player
               </button>
            </div>
         ))}
         <button type='button' onClick={() => append({})}>
            Add Player
         </button>
      </>
   );
};

const MyFormComponent = () => {
   const { control, handleSubmit, register, formState } = useForm();
   const { errors } = formState;
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'teams'
   });

   console.log('fieldsM', fields);
   const onSubmit = data => {
      console.log(data);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         {/* ... Other fields ... */}

         {/* Title */}
         <input
            type='text'
            {...register('title', { required: 'Title is required' })}
         />
         <p>{errors.title?.message}</p>

         {/* Teams */}
         {fields.map((team, teamIndex) => (
            <div key={team.id} className='flex flex-col gap-2'>
               {/* Team Name */}
               <input
                  type='text'
                  className='mt-2'
                  {...register(`teams[${teamIndex}].team_name`, {
                     required: 'Team Name is required'
                  })}
               />
               <p>{errors.teams?.[teamIndex]?.team_name?.message}</p>

               {/* Players */}
               <PlayerFields
                  teamIndex={teamIndex}
                  control={control}
                  errors={errors}
                  register={register}
               />

               <button type='button' onClick={() => remove(teamIndex)}>
                  Remove Team
               </button>
            </div>
         ))}

         <button
            type='button'
            className='px-3 bg-gray-400 p-2 mt-3 ml-2'
            onClick={() => append({ team_name: '', players: [] })}
         >
            Add Team
         </button>

         <button
            className='px-3 text-white  bg-sky-900 p-2 mt-3 ml-2'
            type='submit'
         >
            Submit
         </button>
      </form>
   );
};

export default MyFormComponent;
