import React, { useState } from 'react';
import '../styles/Sedes.css';

function Sedes({ sedes, addSede, removeSede }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sedeName, setSedeName] = useState('');
  const [address, setAddress] = useState('');

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSedeSubmit = (e) => {
    e.preventDefault();
    if (sedeName && address) {
      addSede(sedeName, address);
      setSedeName('');
      setAddress('');
      togglePopup(); // Cierra el popup después de agregar
    }
  };

  return (
    <div className="sedes-container">
      <h1 className="sedes-title" style={{ color: '#ffa500', textAlign: 'center' }}>Sedes</h1>

      {/* Lista de Sedes */}
      <div className="sedes-list-container">
        <h2>Lista de Sedes</h2>
        {sedes.length > 0 ? (
          <ul>
            {sedes.map((sede, index) => (
              <li key={index} className="sede-card">
                <div>
                  <strong>{sede.sedeName}</strong>
                </div>
                <button
                  className="delete-button"
                  onClick={() => removeSede(index)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', color: '#f0f0f0' }}>No hay sedes agregadas</p>
        )}
      </div>

      {/* Botón Flotante */}
      <button className="floating-button" onClick={togglePopup}>+</button>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={togglePopup}>X</button>
            <div className="sede-form-container">
              <h2>Agregar Sede</h2>
              <form onSubmit={handleSedeSubmit}>
                <label>Nombre de la Sede:</label>
                <input
                  type="text"
                  value={sedeName}
                  onChange={(e) => setSedeName(e.target.value)}
                  required
                />
                <label>Dirección:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <button type="submit">Agregar Sede</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sedes;
