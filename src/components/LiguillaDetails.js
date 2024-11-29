// src/components/LiguillaDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/TournamentForm.css'; // Import the CSS file to apply styles

function LiguillaDetails() {
  const { id } = useParams();
  const [liguilla, setLiguilla] = useState(null);

  useEffect(() => {
    const fetchLiguilla = async () => {
      try {
        const response = await axios.get(`/api/liguillas/${id}`);
        setLiguilla(response.data);
      } catch (error) {
        console.error('Error fetching liguilla:', error);
      }
    };
    fetchLiguilla();
  }, [id]);

  if (!liguilla) {
    return <p>Cargando liguilla...</p>;
  }

  return (
    <div className="tournament-details-container">
      <h1 className="tournament-details-title">{liguilla.name}</h1>
      <p><strong>Fecha:</strong> {new Date(liguilla.date).toLocaleDateString()}</p>
      <p><strong>Sede:</strong> {liguilla.sedeName}</p>
      <h2>Partidos:</h2>
      {liguilla.matches.length > 0 ? (
        <ul className="matches-list">
          {liguilla.matches.map((match, index) => (
            <li key={index} className="match-item">
              <p>{match.team1 && match.team1.teamName} vs {match.team2 && match.team2.teamName}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay partidos programados.</p>
      )}
    </div>
  );
}

export default LiguillaDetails;
