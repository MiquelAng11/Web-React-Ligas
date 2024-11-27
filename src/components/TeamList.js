import React from 'react';
import '../styles/TeamForm.css'; // Usamos el mismo archivo CSS para TeamList

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
