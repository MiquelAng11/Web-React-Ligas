// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Equipos from './pages/equipos';
import Torneos from './pages/torneos';
import Jugadores from './pages/jugadores';
import Sedes from './pages/sedes';
import UserSettings from './pages/userSettings';
import Navbar from './components/Navbar';
import Inicio from './pages/inicio';
import './App.css';
import MobileNavbar from './components/MobileNavbar';
import EquiposTorneo from './pages/EquiposTorneo';
import SedeDetalles from './pages/SedeDetalles';

function App() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [liguillas, setLiguillas] = useState([]); // New state for liguillas
  const [sedes, setSedes] = useState([]);
  const [favoriteTournaments, setFavoriteTournaments] = useState([]);

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

  // Function to add a team
  const addTeam = (teamName) => {
    setTeams([...teams, { teamName, players: [] }]);
  };

  // Function to add a player to a team
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

  // Function to remove a team
  const removeTeam = (index) => {
    setTeams((prevTeams) => prevTeams.filter((_, i) => i !== index));
  };

  // Function to add a tournament
  const addTournament = (tournament) => {
    setTournaments([...tournaments, tournament]);
    console.log('Nuevo torneo agregado:', tournament);
  };

  // Function to add a liguilla
  const addRoundRobin = (liguilla) => {
    setLiguillas([...liguillas, liguilla]);
    console.log('Nueva liguilla agregada:', liguilla);
  };

  const addSede = (sedeData) => {
    console.log("Sede añadida:", sedeData); // Para depuración
    setSedes((prevSedes) => [...prevSedes, sedeData]);
  };


  // Function to remove a sede
  const removeSede = (index) => {
    setSedes((prevSedes) => prevSedes.filter((_, i) => i !== index));
  };

  const updateTournament = (index, updatedTournament) => {
    setTournaments((prevTournaments) =>
      prevTournaments.map((tournament, i) =>
        i === index ? updatedTournament : tournament
      )
    );
  };

  const toggleFavorite = (index) => {
    setTournaments((prev) =>
      prev.map((t, i) => {
        if (i === index) {
          const updated = { ...t, isFavorite: !t.isFavorite };
          // Actualizar la lista de favoritos
          if (updated.isFavorite) {
            setFavoriteTournaments((fav) => [...fav, updated]);
          } else {
            setFavoriteTournaments((fav) =>
              fav.filter((favT) => favT.name !== updated.name)
            );
          }
          return updated;
        }
        return t;
      })
    );
  };


  const removeTournament = (index) => {
    setTournaments((prev) => prev.filter((_, i) => i !== index));
  };


  return (
    <Router>
      <div className="app">
        {user ? (
          <>
            <MobileNavbar user={user} handleLogout={handleLogout} />
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
                        updateTournament={updateTournament}
                        toggleFavorite={toggleFavorite}
                        removeTournament={removeTournament}
                      />
                    }
                  />
                  <Route
                    path="/jugadores"
                    element={<Jugadores teams={teams} />}
                  />
                  <Route
                    path="/torneo/:id"
                    element={<EquiposTorneo tournaments={tournaments} />}
                  />
                  <Route
                    path="/sede/:id"
                    element={<SedeDetalles sedes={sedes} tournaments={tournaments} />}
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
                  <Route
                    path="/"
                    element={
                      <Inicio
                        user={user}
                        favoriteTournaments={favoriteTournaments}
                      />
                    }
                  />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<LoginForm setUser={setUser} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;