  // components/Tournament.js
  import React, { useState } from 'react';
  import '../styles/TournamentForm.css';

  function Tournament({ teams = [], addTournament, addRoundRobin, sedes = [] }) {
    const [tournamentName, setTournamentName] = useState('');
    const [tournamentDate, setTournamentDate] = useState('');
    const [tournamentSede, setTournamentSede] = useState('');

    const [roundRobinName, setRoundRobinName] = useState('');
    const [roundRobinDate, setRoundRobinDate] = useState('');
    const [roundRobinSede, setRoundRobinSede] = useState('');

    const [selectedTeams, setSelectedTeams] = useState([]);

    const handleTeamSelection = (e) => {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setSelectedTeams(selectedOptions);
    };


    const handleCreateTournament = () => {
      if (teams.length < 2) {
        alert('Se necesitan al menos 2 equipos para crear un torneo.');
        return;
      }
      if (!tournamentSede) {
        alert('Por favor, selecciona una sede para el torneo.');
        return;
      }
      const tournament = {
        name: tournamentName,
        teams: selectedTeams,
        date: tournamentDate,
        sedeName: tournamentSede,
        rounds: [],
      };
      addTournament?.(tournament);
      setTournamentName('');
      setTournamentDate('');
      setTournamentSede('');
      setSelectedTeams([]);
    };

    const handleCreateRoundRobin = () => {
      if (teams.length < 2) {
        alert('Se necesitan al menos 2 equipos para crear una liguilla.');
        return;
      }
      if (!roundRobinSede) {
        alert('Por favor, selecciona una sede para la liguilla.');
        return;
      }
      const liguilla = {
        name: roundRobinName,
        date: roundRobinDate,
        sedeName: roundRobinSede,
        matches: [],
      };
      addRoundRobin?.(liguilla);
      setRoundRobinName('');
      setRoundRobinDate('');
      setRoundRobinSede('');
    };

    return (
      <div className="tournament-form-container">
        <h2>Crear Torneo</h2>
        <label>Nombre del Torneo:</label>
        <input
          type="text"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
        />
        <label>Seleccionar Equipos:</label>
        <select
          multiple
          value={selectedTeams}
          onChange={handleTeamSelection}
          style={{ height: '100px' }} 
        >
          {teams.map((team, index) => (
            <option key={index} value={team.teamName}>
              {team.teamName}
            </option>
          ))}
        </select>

        <label>Fecha del Torneo:</label>
        <input
          type="date"
          value={tournamentDate}
          onChange={(e) => setTournamentDate(e.target.value)}
        />
        <label>Sede del Torneo:</label>
        <select
          value={tournamentSede}
          onChange={(e) => setTournamentSede(e.target.value)}
        >
          <option value="" disabled>
            Selecciona una sede
          </option>
          {sedes.map((sede, index) => (
            <option key={index} value={sede.sedeName}>
              {sede.sedeName}
            </option>
          ))}
        </select>
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
        <label>Sede de la Liguilla:</label>
        <select
          value={roundRobinSede}
          onChange={(e) => setRoundRobinSede(e.target.value)}
        >
          <option value="" disabled>
            Selecciona una sede
          </option>
          {sedes.map((sede, index) => (
            <option key={index} value={sede.sedeName}>
              {sede.sedeName}
            </option>
          ))}
        </select>
        <button onClick={handleCreateRoundRobin}>Crear Liguilla</button>
      </div>
    );
  }

  export default Tournament;
