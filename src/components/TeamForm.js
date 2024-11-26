// components/TeamForm.js
import React, { useState } from 'react';

function TeamForm({ addTeam, addPlayerToTeam, teams }) {
  const [teamName, setTeamName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [position, setPosition] = useState('Delantero');

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    if (teamName) {
      addTeam(teamName);
      setTeamName('');
    }
  };

  const handlePlayerSubmit = (e) => {
    e.preventDefault();
    if (selectedTeam && playerName) {
      addPlayerToTeam(selectedTeam, playerName, position);
      setPlayerName('');
      setPosition('Delantero');
    }
  };

  return (
    <div>
      <form onSubmit={handleTeamSubmit}>
        <label>Nombre del Equipo:</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <button type="submit">Agregar Equipo</button>
      </form>

      <h3>Agregar Jugador a un Equipo</h3>
      <form onSubmit={handlePlayerSubmit}>
        <label>Selecciona Equipo:</label>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          required
        >
          <option value="" disabled>Selecciona un equipo</option>
          {teams.map((team, index) => (
            <option key={index} value={team.teamName}>
              {team.teamName}
            </option>
          ))}
        </select>
        <label>Nombre del Jugador:</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
        />
        <label>Posición:</label>
        <select value={position} onChange={(e) => setPosition(e.target.value)} required>
          <option value="Portero">Portero</option>
          <option value="Defensa">Defensa</option>
          <option value="Mediocampista">Mediocampista</option>
          <option value="Delantero">Delantero</option>
        </select>
        <button type="submit">Agregar Jugador</button>
      </form>
    </div>
  );
}

export default TeamForm;
