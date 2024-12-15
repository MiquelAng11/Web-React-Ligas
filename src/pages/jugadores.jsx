import React from 'react';
import '../styles/Jugadores.css'; 

function Jugadores({ teams }) {
  return (
    <div className="jugadores-container">
      <h1 className="jugadores-title">Jugadores</h1>
      {teams.length > 0 ? (
        teams.map((team, index) => (
          <div key={index} className="team-card">
            <h2 className="team-name">{team.teamName}</h2>
            {team.players.length > 0 ? (
              <ul className="player-list">
                {team.players.map((player, idx) => (
                  <li key={idx} className="player-item">
                    {player.playerName} - <span className="player-position">{getInitials(player.position)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-players">No hay jugadores en este equipo.</p>
            )}
          </div>
        ))
      ) : (
        <p className="no-teams">No hay equipos disponibles.</p>
      )}
    </div>
  );
}

function getInitials(position) {
  const initials = {
    Portero: 'POR',
    Defensa: 'DEF',
    Mediocampista: 'MED',
    Delantero: 'DEL',
  };
  return initials[position] || 'N/A';
}

export default Jugadores;
