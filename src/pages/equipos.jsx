import React from 'react';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';

function Equipos({ teams, addTeam, addPlayerToTeam, removeTeam }) {
  return (
    <div className="body">
      <h1 style={{ color: '#ffa500' }}>Equipos</h1>
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
