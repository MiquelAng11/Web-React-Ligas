import React from 'react';

function TeamList({ teams, removeTeam }) {
  return (
    <div className="team-list-container">
      <ul>
        {teams && teams.length > 0 ? (
          teams.map((team, index) => (
            <li key={index}>
              <span>{team.teamName}</span>
              <button onClick={() => removeTeam(index)}>❌</button>
            </li>
          ))
        ) : (
          <p>No hay equipos disponibles</p>
        )}
      </ul>
    </div>
  );
}

export default TeamList;
