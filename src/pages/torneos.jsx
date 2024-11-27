import React from 'react';
import Tournament from '../components/Tournament';
import '../styles/TournamentForm.css'; // Unificar estilos

function Torneos({ teams, tournaments, addTournament, addRoundRobin }) {
  return (
    <div className="body">
      <h1 style={{ color: '#ffa500', textAlign: 'center' }}>Torneos</h1>
      <Tournament
        teams={teams}
        addTournament={addTournament}
        addRoundRobin={addRoundRobin}
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Torneos;
