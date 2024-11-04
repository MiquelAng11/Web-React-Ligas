// src/components/TeamList.js
import React, { useState } from 'react';

function TeamList({ teams, onResetTeams }) {
  // Estado para rastrear los equipos cuyos miembros están desplegados
  const [expandedTeams, setExpandedTeams] = useState({});

  // Función para alternar el estado desplegado de cada equipo
  const toggleMembers = (index) => {
    setExpandedTeams((prev) => ({
      ...prev,
      [index]: !prev[index],  // Cambia el estado desplegado de este equipo
    }));
  };

  return (
    <div>
      <button onClick={onResetTeams}>Reset</button>
      <ul>
        {teams.map((team, index) => (
          <li key={index} style={{ marginBottom: '1em' }}>
            <h3>{team.name}</h3>
            <p><strong>Ubicación:</strong> {team.location}</p>
            <p><strong>Entrenador:</strong> {team.coach}</p>

            <button onClick={() => toggleMembers(index)}>
              {expandedTeams[index] ? 'Ocultar Miembros' : 'Mostrar Miembros'}
            </button>

            {expandedTeams[index] && (
              <ul>
                {team.members.map((member, i) => (
                  <li key={i}>{member}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamList;
