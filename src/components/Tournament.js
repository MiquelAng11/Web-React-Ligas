import React, { useState } from 'react';
import '../styles/TournamentForm.css'; // Importamos los estilos

function Tournament({ teams = [], addTournament, addRoundRobin }) {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentDate, setTournamentDate] = useState('');
  const [roundRobinName, setRoundRobinName] = useState('');
  const [roundRobinDate, setRoundRobinDate] = useState('');

  const handleCreateTournament = () => {
    console.log("Equipos disponibles para torneo:", teams); // Verificar los equipos
    if (teams.length < 2) {
      alert("Se necesitan al menos 2 equipos para crear un torneo.");
      return;
    }
    const rounds = []; // Aquí se puede generar la lógica para las rondas
    addTournament?.({ name: tournamentName, date: tournamentDate, rounds });
    setTournamentName('');
    setTournamentDate('');
  };

  const handleCreateRoundRobin = () => {
    console.log("Equipos disponibles para liguilla:", teams); // Verificar los equipos
    if (teams.length < 2) {
      alert("Se necesitan al menos 2 equipos para crear una liguilla.");
      return;
    }
    const matches = []; // Aquí se puede generar la lógica para los partidos
    addRoundRobin?.({ name: roundRobinName, date: roundRobinDate, matches });
    setRoundRobinName('');
    setRoundRobinDate('');
  };

  return (
    <div className="team-form-container">
      <h2>Crear Torneo</h2>
      <label>Nombre del Torneo:</label>
      <input
        type="text"
        value={tournamentName}
        onChange={(e) => setTournamentName(e.target.value)}
      />
      <label>Fecha del Torneo:</label>
      <input
        type="date"
        value={tournamentDate}
        onChange={(e) => setTournamentDate(e.target.value)}
      />
      <button onClick={handleCreateTournament}>Crear Torneo</button>

      <h2>Crear Liguilla</h2>
      <label>Nombre de la Liguilla:</label>
      <input
        type="text"
        value={roundRobinName}
        onChange={(e) => setRoundRobinName(e.target.value)}
      />
      <label>Fecha de la Liguilla:</label>
      <input
        type="date"
        value={roundRobinDate}
        onChange={(e) => setRoundRobinDate(e.target.value)}
      />
      <button onClick={handleCreateRoundRobin}>Crear Liguilla</button>
    </div>
  );
}

export default Tournament;
