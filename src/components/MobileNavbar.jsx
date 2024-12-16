import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/MobileNavbar.css";

function MobileNavbar({ user, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="mobile-navbar">
      {/* Menú Hamburguesa */}
      <button className="hamburger-button" onClick={toggleMenu}>
        ☰
      </button>

      {/* Opciones del menú */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul className="mobile-links">
          <li>
            <Link to="/" onClick={toggleMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/jugadores" onClick={toggleMenu}>
              Jugadores
            </Link>
          </li>
          <li>
            <Link to="/equipos" onClick={toggleMenu}>
              Equipos
            </Link>
          </li>
          <li>
            <Link to="/torneos" onClick={toggleMenu}>
              Torneos
            </Link>
          </li>
          <li>
            <Link to="/sedes" onClick={toggleMenu}>
              Sedes
            </Link>
          </li>
        </ul>

        {/* Información del usuario y botón de logout */}
        {user && (
          <div className="mobile-user">
            <span className="mobile-username">👤 {user.username}</span>
            <button className="mobile-logout-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileNavbar;
