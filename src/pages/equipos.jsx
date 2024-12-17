import React, { useState } from 'react';
import TeamForm from '../components/TeamForm';
import '../styles/TeamForm.css';

function Equipos({ teams, addTeam, addPlayerToTeam, removeTeam }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="body">
      <h1 style={{ color: '#ffa500', textAlign: 'center' }}>Equipos</h1>

      {/* Lista de Equipos */}
      <div className="team-list-container">
        <h2>Lista de Equipos</h2>
        {teams.length > 0 ? (
          <div className="team-cards">
            {teams.map((team, index) => (
              <div key={index} className="team-card">
                <div className="team-icon">⚽</div>
                <div className="team-info">
                  {team.teamName}
                </div>
                <div className="team-actions">
                  <button
                    className="action-button"
                    onClick={() => removeTeam(index)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#f0f0f0' }}>
            No hay equipos creados
          </p>
        )}
      </div>



      {/* Botón Flotante */}
      <button className="floating-button" onClick={togglePopup}>+</button>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={togglePopup}>X</button>
            <TeamForm
              addTeam={addTeam}
              addPlayerToTeam={addPlayerToTeam}
              teams={teams}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Equipos;
