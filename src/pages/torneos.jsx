// src/pages/torneos.js

import React, { useState } from 'react';
import '../styles/TournamentForm.css'; // Ensure this CSS file contains your provided styles

function Torneos({ teams, tournaments, liguillas, addTournament, addRoundRobin, sedes }) {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentDate, setTournamentDate] = useState('');
  const [selectedSede, setSelectedSede] = useState('');
  const [liguillaName, setLiguillaName] = useState('');
  const [liguillaDate, setLiguillaDate] = useState('');

  const handleTournamentSubmit = (e) => {
    e.preventDefault();
    if (tournamentName && selectedSede && tournamentDate) {
      const tournament = {
        name: tournamentName,
        date: tournamentDate,
        sedeName: selectedSede,
      };
      addTournament(tournament);
      setTournamentName('');
      setTournamentDate('');
      setSelectedSede('');
    } else {
      alert('Por favor, completa todos los campos del torneo.');
    }
  };

  const handleLiguillaSubmit = (e) => {
    e.preventDefault();
    if (liguillaName && selectedSede && liguillaDate) {
      const liguilla = {
        name: liguillaName,
        date: liguillaDate,
        sedeName: selectedSede,
      };
      addRoundRobin(liguilla);
      setLiguillaName('');
      setLiguillaDate('');
      setSelectedSede('');
    } else {
      alert('Por favor, completa todos los campos de la liguilla.');
    }
  };

  return (
    <div className="torneos-container">
      <h1 style={{ color: '#ffa500', textAlign: 'center' }}>Torneos y Liguillas</h1>

      <div className="tournament-form-container">
        <h2>Crear Nuevo Torneo</h2>
        <form onSubmit={handleTournamentSubmit}>
          <label>Nombre del Torneo:</label>
          <input
            type="text"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            required
          />
          <label>Fecha del Torneo:</label>
          <input
            type="date"
            value={tournamentDate}
            onChange={(e) => setTournamentDate(e.target.value)}
            required
          />
          <label>Sede:</label>
          <select
            value={selectedSede}
            onChange={(e) => setSelectedSede(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecciona una sede
            </option>
            {sedes.map((sede) => (
              <option key={sede._id} value={sede.sedeName}>
                {sede.sedeName}
              </option>
            ))}
          </select>
          <button type="submit">Crear Torneo</button>
        </form>
      </div>

      <div className="tournament-form-container">
        <h2>Crear Nueva Liguilla</h2>
        <form onSubmit={handleLiguillaSubmit}>
          <label>Nombre de la Liguilla:</label>
          <input
            type="text"
            value={liguillaName}
            onChange={(e) => setLiguillaName(e.target.value)}
            required
          />
          <label>Fecha de la Liguilla:</label>
          <input
            type="date"
            value={liguillaDate}
            onChange={(e) => setLiguillaDate(e.target.value)}
            required
          />
          <label>Sede:</label>
          <select
            value={selectedSede}
            onChange={(e) => setSelectedSede(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecciona una sede
            </option>
            {sedes.map((sede) => (
              <option key={sede._id} value={sede.sedeName}>
                {sede.sedeName}
              </option>
            ))}
          </select>
          <button type="submit">Crear Liguilla</button>
        </form>
      </div>

      <div className="tournaments-list">
        <h2>Torneos Existentes</h2>
        {tournaments.length > 0 ? (
          <ul>
            {tournaments.map((tournament) => (
              <li key={tournament._id}>
                <a href={`/torneos/${tournament._id}`}>{tournament.name}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay torneos disponibles.</p>
        )}
      </div>

      <div className="liguillas-list">
        <h2>Liguillas Existentes</h2>
        {liguillas.length > 0 ? (
          <ul>
            {liguillas.map((liguilla) => (
              <li key={liguilla._id}>
                <a href={`/liguillas/${liguilla._id}`}>{liguilla.name}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay liguillas disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Torneos;
