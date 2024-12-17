import React, { useState } from 'react';
import Tournament from '../components/Tournament';
import '../styles/TournamentForm.css';

function Torneos({ teams, tournaments, liguillas, addTournament, addRoundRobin, sedes }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="body">
      <h1 style={{ color: '#ffa500', textAlign: 'center' }}>Torneos y Liguillas</h1>

      {/* Lista de Torneos */}
      <div className="tournaments-list">
        <h2>Lista de Torneos</h2>
        {tournaments.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#f0f0f0' }}>No hay torneos creados</p>
        ) : (
          <div className="tournament-cards">
            {tournaments.map((tournament, index) => (
              <div key={index} className="tournament-card">
                <div className="tournament-icon">🏆</div>
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

      {/* Botón Flotante */}
      <button className="floating-button" onClick={togglePopup}>+</button>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={togglePopup}>X</button>
            <Tournament
              teams={teams}
              addTournament={addTournament}
              addRoundRobin={addRoundRobin}
              sedes={sedes}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Torneos;
