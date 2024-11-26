import React from 'react';
import Tournament from '../components/Tournament';

function Torneos({ teams, addTournament, addRoundRobin }) {
  return (
    <div className="main">
      <h1>Torneos</h1>
      <Tournament 
        teams={teams}
        addTournament={addTournament}
        addRoundRobin={addRoundRobin}
      />
    </div>
  );
}

export default Torneos;
