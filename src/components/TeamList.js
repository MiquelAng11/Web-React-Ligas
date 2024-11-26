// components/TeamList.js
import React, { useState } from 'react';

function TeamList({ teams, removeTeam, tournaments, roundRobins, removeTournament, removeRoundRobin }) {
  const [expandedTeams, setExpandedTeams] = useState({});

  const toggleExpandTeam = (index) => {
    setExpandedTeams((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      <h2>Equipos</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span onClick={() => toggleExpandTeam(index)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                {team.teamName} {expandedTeams[index] ? '▲' : '▼'}
              </span>
              <button onClick={() => removeTeam(index)}>❌</button>
            </div>
            {expandedTeams[index] && (
              <ul>
                {team.players.map((player, i) => (
                  <li key={i}>{player.playerName} - {player.position}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <h2>Torneos</h2>
      <ul>
        {tournaments.map((tournament, index) => (
          <li key={index}>
            <span>{tournament.name}</span>
            <button onClick={() => removeTournament(index)}>❌</button>
          </li>
        ))}
      </ul>

      <h2>Liguillas</h2>
      <ul>
        {roundRobins.map((roundRobin, index) => (
          <li key={index}>
            <span>{roundRobin.name}</span>
            <button onClick={() => removeRoundRobin(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamList;
