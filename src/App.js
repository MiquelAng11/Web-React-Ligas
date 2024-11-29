// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Equipos from './pages/equipos';
import Torneos from './pages/torneos';
import Jugadores from './pages/jugadores';
import Sedes from './pages/sedes';
import UserSettings from './pages/userSettings';
import Navbar from './components/Navbar';
import Inicio from './pages/inicio';
import TournamentDetails from './components/TournamentDetails';
import LiguillaDetails from './components/LiguillaDetails';
import './App.css';

// Set the base URL for Axios requests
axios.defaults.baseURL = 'http://localhost:5000'; // Adjust if your backend runs on a different port

function App() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [liguillas, setLiguillas] = useState([]);
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedUser.token}`;
      fetchTeams();
      fetchSedes();
      fetchTournaments();
      fetchLiguillas();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Function to fetch teams from the API
  const fetchTeams = async () => {
    try {
      const response = await axios.get('/api/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  // Function to fetch sedes from the API
  const fetchSedes = async () => {
    try {
      const response = await axios.get('/api/sedes');
      setSedes(response.data);
    } catch (error) {
      console.error('Error fetching sedes:', error);
    }
  };

  // Function to fetch tournaments from the API
  const fetchTournaments = async () => {
    try {
      const response = await axios.get('/api/tournaments');
      setTournaments(response.data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

  // Function to fetch liguillas from the API
  const fetchLiguillas = async () => {
    try {
      const response = await axios.get('/api/liguillas');
      setLiguillas(response.data);
    } catch (error) {
      console.error('Error fetching liguillas:', error);
    }
  };

  // Function to add a team
  const addTeam = async (teamName) => {
    try {
      await axios.post('/api/teams', { teamName });
      fetchTeams(); // Refresh the teams list
    } catch (error) {
      console.error('Error adding team:', error);
      alert(error.response?.data?.error || 'Error adding team');
    }
  };

  // Function to add a player to a team
  const addPlayerToTeam = async (teamName, playerName, position) => {
    try {
      await axios.post(`/api/teams/${teamName}/players`, {
        playerName,
        position,
      });
      fetchTeams(); // Refresh the teams list
    } catch (error) {
      console.error('Error adding player to team:', error);
      alert(error.response?.data?.error || 'Error adding player to team');
    }
  };

  // Function to remove a team
  const removeTeam = async (teamName) => {
    try {
      await axios.delete(`/api/teams/${teamName}`);
      fetchTeams(); // Refresh the teams list
    } catch (error) {
      console.error('Error removing team:', error);
      alert(error.response?.data?.error || 'Error removing team');
    }
  };

  // Function to add a sede
  const addSede = async (sedeName, address) => {
    try {
      const response = await axios.post('/api/sedes', { sedeName, address });
      setSedes([...sedes, response.data]);
    } catch (error) {
      console.error('Error adding sede:', error);
      alert(error.response?.data?.error || 'Error adding sede');
    }
  };

  // Function to remove a sede
  const removeSede = async (sedeName) => {
    try {
      await axios.delete(`/api/sedes/${sedeName}`);
      setSedes((prevSedes) => prevSedes.filter((sede) => sede.sedeName !== sedeName));
    } catch (error) {
      console.error('Error removing sede:', error);
      alert(error.response?.data?.error || 'Error removing sede');
    }
  };

  // Function to add a tournament
  const addTournament = async (tournament) => {
    try {
      const response = await axios.post('/api/tournaments', tournament);
      setTournaments([...tournaments, response.data]);
      console.log('Nuevo torneo agregado:', response.data);
    } catch (error) {
      console.error('Error adding tournament:', error);
      alert(error.response?.data?.error || 'Error adding tournament');
    }
  };

  // Function to add a liguilla
  const addRoundRobin = async (liguilla) => {
    try {
      const response = await axios.post('/api/liguillas', liguilla);
      setLiguillas([...liguillas, response.data]);
      console.log('Nueva liguilla agregada:', response.data);
    } catch (error) {
      console.error('Error adding liguilla:', error);
      alert(error.response?.data?.error || 'Error adding liguilla');
    }
  };

  return (
    <Router>
      <div className="app">
        {user ? (
          <>
            <Navbar user={user} handleLogout={handleLogout} />
            <div className="content">
              <main className="main">
                <Routes>
                  <Route
                    path="/equipos"
                    element={
                      <Equipos
                        teams={teams}
                        addTeam={addTeam}
                        addPlayerToTeam={addPlayerToTeam}
                        removeTeam={removeTeam}
                        fetchTeams={fetchTeams}
                      />
                    }
                  />
                  <Route
                    path="/torneos"
                    element={
                      <Torneos
                        teams={teams}
                        tournaments={tournaments}
                        liguillas={liguillas}
                        addTournament={addTournament}
                        addRoundRobin={addRoundRobin}
                        sedes={sedes}
                      />
                    }
                  />
                  <Route
                    path="/jugadores"
                    element={<Jugadores teams={teams} />}
                  />
                  <Route
                    path="/sedes"
                    element={
                      <Sedes
                        sedes={sedes}
                        addSede={addSede}
                        removeSede={removeSede}
                      />
                    }
                  />
                  <Route path="/settings" element={<UserSettings />} />
                  <Route path="/" element={<Inicio user={user} />} />
                  <Route path="/torneos/:id" element={<TournamentDetails />} />
                  <Route path="/liguillas/:id" element={<LiguillaDetails />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/register" element={<RegisterForm setUser={setUser} />} />
            <Route path="*" element={<LoginForm setUser={setUser} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
