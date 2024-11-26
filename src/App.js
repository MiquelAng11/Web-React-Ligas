import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <div className="header">
            {user ? (
              <div className="user-icon">
                <span>👤</span>
                <Link to="/settings">Ajustes</Link>
                <button className="logout-button" onClick={() => setUser(null)}>🔴</button>
              </div>
            ) : (
              <span>Inicia sesión</span>
            )}
          </div>
          <Routes>
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/torneos" element={<Torneos />} />
            <Route path="/jugadores" element={<Jugadores />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/" element={
                <div className="main">
                  <h1>Bienvenido</h1>
                </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
