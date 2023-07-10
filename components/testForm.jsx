import { useState } from 'react';

const MyForm = () => {
   const [formData, setFormData] = useState({
      title: '',
      teams: [
         {
            team_name: '',
            players: [{ name: '', age: '' }]
         }
      ]
   });

   const handleChange = (event, teamIndex, playerIndex) => {
      const { name, value } = event.target;

      setFormData(prevFormData => {
         const updatedTeams = [...prevFormData.teams];
         const updatedPlayers = [...updatedTeams[teamIndex].players];

         updatedPlayers[playerIndex] = {
            ...updatedPlayers[playerIndex],
            [name]: value
         };

         updatedTeams[teamIndex] = {
            ...updatedTeams[teamIndex],
            players: updatedPlayers
         };

         return {
            ...prevFormData,
            teams: updatedTeams
         };
      });
   };

   const handleAddPlayer = teamIndex => {
      setFormData(prevFormData => {
         const updatedTeams = [...prevFormData.teams];
         updatedTeams[teamIndex].players.push({ name: '', age: '' });

         return {
            ...prevFormData,
            teams: updatedTeams
         };
      });
   };

   const handleRemovePlayer = (teamIndex, playerIndex) => {
      setFormData(prevFormData => {
         const updatedTeams = [...prevFormData.teams];
         updatedTeams[teamIndex].players.splice(playerIndex, 1);

         return {
            ...prevFormData,
            teams: updatedTeams
         };
      });
   };

   const handleAddTeam = () => {
      setFormData(prevFormData => {
         const updatedTeams = [...prevFormData.teams];
         updatedTeams.push({
            team_name: '',
            players: [{ name: '', age: '' }]
         });

         return {
            ...prevFormData,
            teams: updatedTeams
         };
      });
   };

   const handleRemoveTeam = teamIndex => {
      setFormData(prevFormData => {
         const updatedTeams = [...prevFormData.teams];
         updatedTeams.splice(teamIndex, 1);

         return {
            ...prevFormData,
            teams: updatedTeams
         };
      });
   };

   const handleSubmit = event => {
      event.preventDefault();
      console.log(formData);
   };

   return (
      <form onSubmit={handleSubmit}>
         <input
            type='text'
            name='title'
            value={formData.title}
            onChange={event =>
               setFormData({ ...formData, title: event.target.value })
            }
         />

         {formData.teams.map((team, teamIndex) => (
            <div key={teamIndex}>
               <input
                  type='text'
                  name={`teams[${teamIndex}].team_name`}
                  value={team.team_name}
                  onChange={event => handleChange(event, teamIndex, 0)}
               />

               {team.players.map((player, playerIndex) => (
                  <div key={playerIndex}>
                     <input
                        type='text'
                        name={`teams[${teamIndex}].players[${playerIndex}].name`}
                        value={player.name}
                        onChange={event =>
                           handleChange(event, teamIndex, playerIndex)
                        }
                     />

                     <input
                        type='text'
                        name={`teams[${teamIndex}].players[${playerIndex}].age`}
                        value={player.age}
                        onChange={event =>
                           handleChange(event, teamIndex, playerIndex)
                        }
                     />

                     {playerIndex === team.players.length - 1 && (
                        <button
                           type='button'
                           onClick={() => handleAddPlayer(teamIndex)}
                        >
                           Add Player
                        </button>
                     )}

                     {team.players.length > 1 && (
                        <button
                           type='button'
                           onClick={() =>
                              handleRemovePlayer(teamIndex, playerIndex)
                           }
                        >
                           Remove Player
                        </button>
                     )}
                  </div>
               ))}

               <button type='button' onClick={handleAddTeam}>
                  Add Team
               </button>

               {formData.teams.length > 1 && (
                  <button
                     type='button'
                     onClick={() => handleRemoveTeam(teamIndex)}
                  >
                     Remove Team
                  </button>
               )}
            </div>
         ))}

         <button type='submit'>Submit</button>
      </form>
   );
};

export default MyForm;
