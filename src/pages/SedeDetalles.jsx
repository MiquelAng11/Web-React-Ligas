import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../styles/SedeDetalles.css';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

function SedeDetalles({ sedes, tournaments }) {
  const { id } = useParams(); // Obtener el ID de la sede de la URL
  const navigate = useNavigate();
  const sede = sedes[Number(id)]; // Buscar la sede por índice

  if (!sede) {
    return (
      <div className="sede-detalles-container">
        <h1 className="error-title">Sede no encontrada</h1>
        <button className="back-button" onClick={() => navigate('/sedes')}>
          Volver a Sedes
        </button>
      </div>
    );
  }

  // Filtrar torneos que tienen esta sede
  const torneosEnSede = tournaments.filter(
    (tournament) => tournament.sedeName === sede?.sedeName
  );

  return (
    <div className="sede-detalles-container">
      <h1 className="sede-title">Detalles de la Sede: {sede.sedeName}</h1>

      <div className="sede-info">
        <p>
          <strong>Ubicación:</strong>{' '}
          {`Latitud: ${sede.lat}, Longitud: ${sede.lng}`}
        </p>

        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{
              lat: sede.lat, // Usa directamente las propiedades lat y lng
              lng: sede.lng,
            }}
            zoom={15}
          >
            <Marker
              position={{
                lat: sede.lat, // Usa directamente las propiedades lat y lng
                lng: sede.lng,
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>

      <h2 className="torneos-title">Torneos en esta sede</h2>
      {torneosEnSede.length > 0 ? (
        <ul className="torneos-list">
          {torneosEnSede.map((tournament, index) => (
            <li key={index} className="torneo-item">
              {tournament.name} - {tournament.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay torneos registrados en esta sede.</p>
      )}

      <button className="back-button" onClick={() => navigate('/sedes')}>
        Volver a Sedes
      </button>
    </div>
  );
}

export default SedeDetalles;
