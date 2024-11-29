// pages/sedes.js

import React, { useState, useEffect } from 'react';
import '../styles/Sedes.css';

function Sedes({ sedes, addSede, removeSede }) {
  const [sedeName, setSedeName] = useState('');
  const [address, setAddress] = useState('');

  return (
    <div className="sedes-container">
      <h1 className="sedes-title" style={{ color: '#ffa500', textAlign: 'center' }}>Sedes</h1>
      <div className="sede-form-container">
        <h2>Agregar Sede</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (sedeName && address) {
            addSede(sedeName, address);
            setSedeName('');
            setAddress('');
          }
        }}>
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
      <div className="sedes-list-container">
        <h2>Lista de Sedes</h2>
        {sedes.length > 0 ? (
          <ul>
            {sedes.map((sede) => (
              <li key={sede._id}>
                <div>
                  <strong>{sede.sedeName}</strong> - {sede.address}
                </div>
                <button onClick={() => removeSede(sede.sedeName)}>Eliminar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', color: '#f0f0f0' }}>
            No hay sedes agregadas
          </p>
        )}
      </div>
    </div>
  );
}

export default Sedes;
