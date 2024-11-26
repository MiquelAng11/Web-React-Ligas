// components/Tournament.js
import React, { useState } from 'react';

function Tournament({ teams = [], addTournament, addRoundRobin }) {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentDate, setTournamentDate] = useState('');
  const [roundRobinName, setRoundRobinName] = useState('');
  const [roundRobinDate, setRoundRobinDate] = useState('');

  const handleCreateTournament = () => {
    if (teams.length < 2) {
      alert("Se necesitan al menos 2 equipos para crear un torneo.");
      return;
    }
    const rounds = []; // Generación de rondas para el torneo
    addTournament({ name: tournamentName, date: tournamentDate, rounds });
    setTournamentName('');
    setTournamentDate('');
  };

  const handleCreateRoundRobin = () => {
    if (teams.length < 2) {
      alert("Se necesitan al menos 2 equipos para crear una liguilla.");
      return;
    }
    const matches = []; // Generación de partidos para la liguilla
    addRoundRobin({ name: roundRobinName, date: roundRobinDate, matches });
    setRoundRobinName('');
    setRoundRobinDate('');
  };

  return (
    <div>
      <h2>Crear Torneo</h2>
      <div>
        <label>Nombre del Torneo:</label>
        <input
          type="text"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha del Torneo:</label>
        <input
          type="date"
          value={tournamentDate}
          onChange={(e) => setTournamentDate(e.target.value)}
        />
      </div>
      <button onClick={handleCreateTournament}>Crear Torneo</button>

      <h2>Crear Liguilla</h2>
      <div>
        <label>Nombre de la Liguilla:</label>
        <input
          type="text"
          value={roundRobinName}
          onChange={(e) => setRoundRobinName(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha de la Liguilla:</label>
        <input
          type="date"
          value={roundRobinDate}
          onChange={(e) => setRoundRobinDate(e.target.value)}
        />
      </div>
      <button onClick={handleCreateRoundRobin}>Crear Liguilla</button>
    </div>
  );
}

export default Tournament;
