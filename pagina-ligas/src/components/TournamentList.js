// src/components/TournamentList.js
import React from 'react';

function TournamentList({ tournaments }) {
  return (
    <ul>
      {tournaments.map((tournament, index) => (
        <li key={index}>
          <strong>{tournament.name}</strong>: {tournament.description}
        </li>
      ))}
    </ul>
  );
}

export default TournamentList;
