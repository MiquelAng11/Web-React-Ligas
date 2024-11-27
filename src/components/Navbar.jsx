import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-title-link">
        <h2 className="navbar-title">Menú</h2>
      </Link>
      <ul className="navbar-links">
        <li>
          <Link to="/jugadores">Jugadores</Link>
        </li>
        <li>
          <Link to="/torneos">Torneos</Link>
        </li>
        <li>
          <Link to="/equipos">Equipos</Link>
        </li>
        <li>
          <Link to="/sedes">Sedes</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
