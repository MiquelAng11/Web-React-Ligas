// src/components/TournamentDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/TournamentForm.css'; // Import the CSS file to apply styles

function TournamentDetails() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(`/api/tournaments/${id}`);
        setTournament(response.data);
      } catch (error) {
        console.error('Error fetching tournament:', error);
      }
    };
    fetchTournament();
  }, [id]);

  if (!tournament) {
    return <p>Cargando torneo...</p>;
  }

  return (
    <div className="tournament-details-container">
      <h1 className="tournament-details-title">{tournament.name}</h1>
      <p><strong>Fecha:</strong> {new Date(tournament.date).toLocaleDateString()}</p>
      <p><strong>Sede:</strong> {tournament.sedeName}</p>
      <h2>Partidos:</h2>
      {tournament.matches.length > 0 ? (
        <ul className="matches-list">
          {tournament.matches.map((match, index) => (
            <li key={index} className="match-item">
              <p>{match.team1 && match.team1.teamName} vs {match.team2 ? match.team2.teamName : 'BYE'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay partidos programados.</p>
      )}
    </div>
  );
}

export default TournamentDetails;
