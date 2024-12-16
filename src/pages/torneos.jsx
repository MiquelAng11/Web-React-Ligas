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
          <div className="tournament-cards">
            {tournaments.map((tournament, index) => (
              <div key={index} className="tournament-card">
                <div className="tournament-icon">
                  🏆 {/* Icono del trofeo */}
                </div>
                <div className="tournament-info">
                  <h3>{tournament.name}</h3>
                  <p>Fecha: {tournament.date}</p>
                  <p>Sede: {tournament.sedeName || 'No asignada'}</p>
                </div>
                <div className="tournament-actions">
                  <button className="action-button">📤</button>
                  <button className="action-button">🗑️</button>
                </div>
              </div>
            ))}
          </div>
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
