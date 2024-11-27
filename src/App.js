import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Equipos from './pages/equipos';
import Torneos from './pages/torneos';
import Jugadores from './pages/jugadores';
import UserSettings from './pages/userSettings';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]); // Estado para almacenar los equipos
  const [tournaments, setTournaments] = useState([]); // Estado para almacenar los torneos

  // Cargar el usuario almacenado en localStorage al iniciar la aplicación
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Manejar cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  // Función para agregar un equipo
  const addTeam = (teamName) => {
    setTeams([...teams, { teamName, players: [] }]);
  };

  // Función para agregar un jugador a un equipo
  const addPlayerToTeam = (teamName, playerName, position) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.teamName === teamName
          ? {
              ...team,
              players: [...team.players, { playerName, position }],
            }
          : team
      )
    );
  };

  // Función para agregar torneos
  const addTournament = (tournament) => {
    setTournaments([...tournaments, tournament]);
    console.log('Nuevo torneo agregado:', tournament);
  };

  // Función para agregar liguillas (round robin)
  const addRoundRobin = (roundRobin) => {
    console.log('Nueva liguilla agregada:', roundRobin);
    // Puedes agregar lógica aquí si necesitas guardar las liguillas
  };

  // Función para eliminar un equipo
  const removeTeam = (index) => {
    setTeams((prevTeams) => prevTeams.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <div className="app">
        {user ? (
          <>
            {/* Navbar con usuario y logout */}
            <Navbar user={user} handleLogout={handleLogout} />

            {/* Contenedor principal */}
            <div className="content">
              {/* Contenido principal */}
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
                      />
                    }
                  />
                  <Route
                    path="/torneos"
                    element={
                      <Torneos
                        teams={teams}
                        tournaments={tournaments}
                        addTournament={addTournament}
                        addRoundRobin={addRoundRobin}
                      />
                    }
                  />
                  <Route path="/jugadores" element={<Jugadores teams={teams} />} />
                  <Route path="/settings" element={<UserSettings />} />
                  <Route path="/" element={<h1>Bienvenido</h1>} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          // Redirigir a Login si no está autenticado
          <Routes>
            <Route path="*" element={<LoginForm setUser={setUser} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
