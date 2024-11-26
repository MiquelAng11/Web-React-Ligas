import React from 'react';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';

function Equipos({ teams, addTeam, addPlayerToTeam, removeTeam }) {
  return (
    <div className="main">
      <h1>Equipos</h1>
      <TeamForm 
        addTeam={addTeam}
        addPlayerToTeam={addPlayerToTeam}
        teams={teams}
      />
      <TeamList 
        teams={teams}
        removeTeam={removeTeam}
      />
    </div>
  );
}

export default Equipos;
