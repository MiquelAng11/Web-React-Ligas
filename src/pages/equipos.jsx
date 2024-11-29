// pages/equipos.js

import React, { useEffect } from 'react';
import TeamForm from '../components/TeamForm';

function Equipos({ teams, addTeam, addPlayerToTeam, removeTeam, fetchTeams }) {
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <div className="body">
      <h1 style={{ color: '#ffa500', textAlign: 'center' }}>Equipos</h1>
      <TeamForm
        addTeam={addTeam}
        addPlayerToTeam={addPlayerToTeam}
        teams={teams}
      />
      <div className="team-list-container">
        <h2>Lista de Equipos</h2>
        {teams.length > 0 ? (
          <ul>
            {teams.map((team) => (
              <li key={team._id}>
                {team.teamName}
                <button onClick={() => removeTeam(team.teamName)}>Eliminar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', color: '#f0f0f0' }}>
            No hay equipos creados
          </p>
        )}
      </div>
    </div>
  );
}

export default Equipos;
