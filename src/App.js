// App.js
import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import TeamForm from './components/TeamForm';
import Tournament from './components/Tournament';
import TeamList from './components/TeamList';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [roundRobins, setRoundRobins] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const addTeam = (teamName) => {
    setTeams((prevTeams) => [
      ...prevTeams,
      { teamName, players: [] },
    ]);
  };

  const addPlayerToTeam = (teamName, playerName, position) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.teamName === teamName
          ? { ...team, players: [...team.players, { playerName, position }] }
          : team
      )
    );
  };

  const removeTeam = (index) => {
    setTeams((prevTeams) => prevTeams.filter((_, i) => i !== index));
  };

  const addTournament = (tournament) => {
    setTournaments((prev) => [...prev, tournament]);
  };

  const addRoundRobin = (roundRobin) => {
    setRoundRobins((prev) => [...prev, roundRobin]);
  };

  const removeTournament = (index) => {
    setTournaments((prev) => prev.filter((_, i) => i !== index));
  };

  const removeRoundRobin = (index) => {
    setRoundRobins((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="navbar">
        {user ? (
          <div className="welcome-message">
            Bienvenido, {user.username}
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <span>Inicia sesión</span>
        )}
      </div>

      <div className="content">
        {user ? (
          <>
            <div className="sidebar">
              <TeamList
                teams={teams}
                tournaments={tournaments}
                roundRobins={roundRobins}
                removeTeam={removeTeam}
                removeTournament={removeTournament}
                removeRoundRobin={removeRoundRobin}
              />
            </div>
            <div className="main-content">
              <h2>Agregar Equipo</h2>
              <TeamForm addTeam={addTeam} addPlayerToTeam={addPlayerToTeam} teams={teams} />

              <Tournament
                teams={teams}
                addTournament={addTournament}
                addRoundRobin={addRoundRobin}
              />
            </div>
          </>
        ) : (
          <LoginForm setUser={setUser} />
        )}
      </div>
    </div>
  );
}

export default App;
