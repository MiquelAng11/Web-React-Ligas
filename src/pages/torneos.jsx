// pages/torneos.js
import React from 'react';
import Tournament from '../components/Tournament';
import '../styles/TournamentForm.css';

function Torneos({ teams, tournaments, liguillas, addTournament, addRoundRobin, sedes }) {
  return (
    <div className="body">
      <h1 style={{ color: '#ffa500', textAlign: 'center' }}>Torneos y Liguillas</h1>
      <Tournament
        teams={teams}
        addTournament={addTournament}
        addRoundRobin={addRoundRobin}
        sedes={sedes}
      />
      <div className="tournaments-list">
        <h2>Lista de Torneos</h2>
        {tournaments.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#f0f0f0' }}>
            No hay torneos creados
          </p>
        ) : (
          <ul>
            {tournaments.map((tournament, index) => (
              <li key={index}>
                <strong>{tournament.name}</strong> - Fecha: {tournament.date}
                <br />
                Sede: {tournament.sedeName || 'No asignada'}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="liguillas-list">
        <h2>Lista de Liguillas</h2>
        {liguillas.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#f0f0f0' }}>
            No hay liguillas creadas
          </p>
        ) : (
          <ul>
            {liguillas.map((liguilla, index) => (
              <li key={index}>
                <strong>{liguilla.name}</strong> - Fecha: {liguilla.date}
                <br />
                Sede: {liguilla.sedeName || 'No asignada'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Torneos;
