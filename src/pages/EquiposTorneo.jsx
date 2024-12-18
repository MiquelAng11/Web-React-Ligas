import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ClassificationTable.css';

function EquiposTorneo({ tournaments }) {
  const { id } = useParams(); // Obtiene el id de la URL
  const navigate = useNavigate();
  const tournament = tournaments[Number(id)]; // Busca el torneo por índice

  if (!tournament) {
    return (
      <div className="body">
        <h1 style={{ color: '#ffa500', textAlign: 'center' }}>Torneo no encontrado</h1>
        <button onClick={() => navigate('/torneos')} className="back-button">
          Volver a Torneos
        </button>
      </div>
    );
  }

  // Simulación de datos de clasificación
  const classification = tournament.teams.map((team, index) => ({
    position: index + 1,
    teamName: team,
    played: Math.floor(Math.random() * 10), // Simulación de partidos jugados
    won: Math.floor(Math.random() * 5), // Simulación de partidos ganados
    drawn: Math.floor(Math.random() * 3), // Empatados
    lost: Math.floor(Math.random() * 5), // Perdidos
    goalsFor: Math.floor(Math.random() * 20),
    goalsAgainst: Math.floor(Math.random() * 15),
  }));

  // Calcular puntos y diferencia de goles
  classification.forEach((team) => {
    team.points = team.won * 3 + team.drawn;
    team.goalDifference = team.goalsFor - team.goalsAgainst;
  });

  // Ordenar por puntos y diferencia de goles
  classification.sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference);

  return (
    <div className="body">
      <h1 className="title">Clasificación del Torneo: {tournament.name}</h1>

      <div className="classification-table-container">
        <table className="classification-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Equipo</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {classification.map((team, index) => (
              <tr key={index}>
                <td>{team.position}</td>
                <td>{team.teamName}</td>
                <td>{team.played}</td>
                <td>{team.won}</td>
                <td>{team.drawn}</td>
                <td>{team.lost}</td>
                <td>{team.goalsFor}</td>
                <td>{team.goalsAgainst}</td>
                <td>{team.goalDifference}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => navigate('/torneos')} className="back-button">
        Volver a Torneos
      </button>
    </div>
  );
}

export default EquiposTorneo;
