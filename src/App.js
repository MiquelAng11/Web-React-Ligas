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

  return (
    <Router>
      <div className="app">
        {user ? (
          <>
            <Navbar />
            <div className="content">
              <div className="header">
                <div className="user-icon">
                  <span>👤</span>
                  <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
              </div>
              <Routes>
                <Route path="/equipos" element={<Equipos />} />
                <Route path="/torneos" element={<Torneos />} />
                <Route path="/jugadores" element={<Jugadores />} />
                <Route path="/settings" element={<UserSettings />} />
                <Route path="/" element={<div className="main"><h1>Bienvenido</h1></div>} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
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
