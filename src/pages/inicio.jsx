import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Inicio.css';

function Inicio({ user }) {
  return (
    <div className="inicio-container">
      <h1 className="inicio-titulo">Bienvenido, {user ? user.username : "Usuario"}!</h1>
      <p className="inicio-descripcion">
        Gestiona equipos, torneos y jugadores con facilidad.
      </p>
      <div className="inicio-secciones">
        <Link to="/equipos" className="inicio-seccion">
          <h2>📋 Equipos</h2>
          <p>
            Crea, organiza y administra tus equipos. Añade jugadores y gestiona sus posiciones.
          </p>
        </Link>
        <Link to="/torneos" className="inicio-seccion">
          <h2>🏆 Torneos</h2>
          <p>
            Diseña torneos personalizados, crea rondas y lleva un registro detallado.
          </p>
        </Link>
        <Link to="/jugadores" className="inicio-seccion">
          <h2>👥 Jugadores</h2>
          <p>
            Consulta y organiza a los jugadores de tus equipos con facilidad.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Inicio;
