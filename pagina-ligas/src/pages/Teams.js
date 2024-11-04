// src/pages/Teams.js
import React, { useState, useEffect } from 'react';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
    setTeams(storedTeams);
  }, []);

  const addTeam = (team) => {
    const updatedTeams = [...teams, team];
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
  };

  const resetTeams = () => {
    // Resetea el estado y localStorage
    setTeams([]);
    localStorage.removeItem('teams');
  };

  return (
    <div>
      <h2>Equipos</h2>
      <TeamForm onAddTeam={addTeam} />
      <TeamList teams={teams} onResetTeams={resetTeams} />
    </div>
  );
}

export default Teams;
