import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../styles/Sedes.css';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 40.416775, // Coordenadas iniciales (Madrid)
  lng: -3.703790,
};

function Sedes({ sedes, addSede, removeSede }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sedeName, setSedeName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const navigate = useNavigate(); // Hook de navegación

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };


  const handleSedeSubmit = (e) => {
    e.preventDefault();
    if (sedeName && selectedLocation) {
      const sedeData = {
        sedeName,
        lat: selectedLocation.lat, // Guardar latitud
        lng: selectedLocation.lng, // Guardar longitud
        googleMapsLink: `https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`,
      };
      addSede(sedeData); // Enviar directamente la nueva sede a addSede
      setSedeName(''); // Limpiar formulario
      setSelectedLocation(defaultCenter); // Resetear ubicación seleccionada
      togglePopup(); // Cerrar el popup
    }
  };
  
  
  
  
  return (
    <div className="sedes-container">
      <h1 className="sedes-title" style={{ color: '#ffa500', textAlign: 'center' }}>
        Sedes
      </h1>

      {/* Lista de Sedes */}
      <div className="sedes-list-container">
        <h2>Lista de Sedes</h2>
        {Array.isArray(sedes) && sedes.length > 0 ? (
          <ul>
            {sedes.map((sede, index) => (
              <li
                key={index}
                className="sede-card"
                onClick={() => navigate(`/sede/${index}`)} // Uso correcto de navigate
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <strong>{sede.sedeName}</strong>
                  <p>{sede.address}</p>
                  <a
                    href={sede.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="maps-link"
                  >
                    Ir a ubicación
                  </a>
                </div>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSede(index);
                  }}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', color: '#f0f0f0' }}>
            No hay sedes agregadas
          </p>
        )}
      </div>

      {/* Botón Flotante */}
      <button className="floating-button" onClick={togglePopup}>
        +
      </button>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={togglePopup}>
              X
            </button>
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
                <label>Selecciona la Ubicación en el Mapa:</label>
                <LoadScript
                  googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                  libraries={['places']}
                  onError={() =>
                    console.error('Error al cargar la API de Google Maps')
                  }
                >
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={selectedLocation}
                    zoom={15}
                    onClick={handleMapClick}
                  >
                    <Marker position={selectedLocation} />
                  </GoogleMap>
                </LoadScript>
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
