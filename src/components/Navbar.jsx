// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ user, handleLogout }) {
  return (
    <div className="navbar">
      <h2 className="navbar-title">Menú</h2>
      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/jugadores">Jugadores</Link>
        </li>
        <li>
          <Link to="/equipos">Equipos</Link>
        </li>
        <li>
          <Link to="/torneos">Torneos</Link>
        </li>
        <li>
          <Link to="/sedes">Sedes</Link>
        </li>
      </ul>
      {user && (
        <div className="navbar-user">
          <span>👤 {user.username}</span>
          <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
