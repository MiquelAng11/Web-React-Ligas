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

  return (
    <Router>
      <div className="app">
        {user ? (
          <>
            {/* Navbar fijo */}
            <Navbar />

            {/* Contenedor principal */}
            <div className="content">
              {/* Header */}
              <header className="header">
                <div className="user-icon">
                  <span>👤</span>
                  <button className="logout-button" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </div>
              </header>

              {/* Contenido principal */}
              <main className="main">
                <Routes>
                  <Route path="/equipos" element={<Equipos />} />
                  <Route path="/torneos" element={<Torneos />} />
                  <Route path="/jugadores" element={<Jugadores />} />
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
