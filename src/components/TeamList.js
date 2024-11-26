import React from 'react';

function TeamList({ teams, removeTeam }) {
  return (
    <ul>
      {teams && teams.length > 0 ? (
        teams.map((team, index) => (
          <li key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{team.teamName}</span>
              <button onClick={() => removeTeam(index)}>❌</button>
            </div>
          </li>
        ))
      ) : (
        <p>No hay equipos disponibles</p>
      )}
    </ul>
  );
}

export default TeamList;
