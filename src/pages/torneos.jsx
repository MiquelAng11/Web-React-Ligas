import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tournament from '../components/Tournament';
import '../styles/TournamentForm.css';

function Torneos({
  teams,
  tournaments,
  liguillas,
  addTournament,
  addRoundRobin,
  sedes,
  updateTournament,
  toggleFavorite,
  removeTournament, // Nueva función para eliminar torneo
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editTournamentIndex, setEditTournamentIndex] = useState(null);
  const [editTournamentData, setEditTournamentData] = useState(null);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const openEditPopup = (index) => {
    setEditTournamentIndex(index);
    setEditTournamentData(tournaments[index]);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setEditTournamentIndex(null);
    setEditTournamentData(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTournamentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamsSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setEditTournamentData((prev) => ({ ...prev, teams: selectedOptions }));
  };

  const saveTournamentChanges = () => {
    const updatedTournament = {
      ...editTournamentData,
      teams: editTournamentData.teams || [],
    };
    updateTournament(editTournamentIndex, updatedTournament);
    closeEditPopup();
  };

  const handleFavoriteToggle = (index) => {
    toggleFavorite(index);
  };

  const handleRemoveTournament = (index) => {
    removeTournament(index);
  };

  return (
    <div className="body">
      <h1 style={{ color: '#ffa500', textAlign: 'center' }}>Torneos y Liguillas</h1>
      <div className="tournaments-list">
        <h2>Lista de Torneos</h2>
        {tournaments.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#f0f0f0' }}>No hay torneos creados</p>
        ) : (
          <div className="tournament-cards">
            {tournaments.map((tournament, index) => (
              <div key={index} className="tournament-card">
                <div className="tournament-icon">🏆</div>
                <div
                  className="tournament-info"
                  onClick={() => navigate(`/torneo/${index}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{tournament.name}</h3>
                  <p>Fecha: {tournament.date}</p>
                  <p>Sede: {tournament.sedeName || 'No asignada'}</p>
                  <p>
                    Equipos:{' '}
                    {tournament.teams && tournament.teams.length > 0
                      ? tournament.teams.join(', ')
                      : 'Sin equipos'}
                  </p>
                </div>
                <div className="tournament-actions">
                  <button
                    className={`action-button ${tournament.isFavorite ? 'favorite' : ''}`}
                    onClick={() => handleFavoriteToggle(index)}
                  >
                    📥
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleRemoveTournament(index)}
                  >
                    🗑️
                  </button>
                  <button
                    className="action-button"
                    onClick={() => openEditPopup(index)}
                  >
                    ⚙️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="floating-button" onClick={togglePopup}>
        +
      </button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={togglePopup}>
              X
            </button>
            <div className="scrollable-content">
              <Tournament
                teams={teams}
                addTournament={addTournament}
                addRoundRobin={addRoundRobin}
                sedes={sedes}
              />
            </div>
          </div>
        </div>
      )}

      {isEditPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={closeEditPopup}>
              X
            </button>
            <h2 style={{ textAlign: 'center', color: '#ffa500' }}>Editar Torneo</h2>
            <label>Nombre del Torneo:</label>
            <input
              type="text"
              name="name"
              value={editTournamentData?.name || ''}
              onChange={handleEditChange}
            />
            <label>Fecha del Torneo:</label>
            <input
              type="date"
              name="date"
              value={editTournamentData?.date || ''}
              onChange={handleEditChange}
            />
            <label>Sede del Torneo:</label>
            <select
              name="sedeName"
              value={editTournamentData?.sedeName || ''}
              onChange={handleEditChange}
            >
              <option value="">Selecciona una sede</option>
              {sedes.map((sede, index) => (
                <option key={index} value={sede.sedeName}>
                  {sede.sedeName}
                </option>
              ))}
            </select>
            <label>Añadir Equipos:</label>
            <select
              multiple
              value={editTournamentData?.teams || []}
              onChange={handleTeamsSelection}
              style={{ height: '100px', width: '100%' }}
            >
              {teams.map((team, index) => (
                <option key={index} value={team.teamName}>
                  {team.teamName}
                </option>
              ))}
            </select>
            <button onClick={saveTournamentChanges}>Guardar Cambios</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Torneos;
