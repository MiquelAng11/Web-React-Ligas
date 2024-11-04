// src/pages/Tournaments.js
import React, { useState, useEffect } from 'react';
import TournamentForm from '../components/TournamentForm';
import TournamentList from '../components/TournamentList';

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const storedTournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
    setTournaments(storedTournaments);
  }, []);

  const addTournament = (tournament) => {
    const updatedTournaments = [...tournaments, tournament];
    setTournaments(updatedTournaments);
    localStorage.setItem('tournaments', JSON.stringify(updatedTournaments));
  };

  return (
    <div>
      <h2>Torneos</h2>
      <TournamentForm onAddTournament={addTournament} />
      <TournamentList tournaments={tournaments} />
    </div>
  );
}

export default Tournaments;
