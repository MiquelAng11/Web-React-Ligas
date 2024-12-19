// pages/inicio.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Inicio.css';

function Inicio({ user, favoriteTournaments = [] }) {
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
        <Link to="/sedes" className="inicio-seccion">
          <h2>📍 Sedes</h2>
          <p>
            Añade y administra las sedes donde se llevarán a cabo los torneos y liguillas.
          </p>
        </Link>
      </div>
      <div className="favorite-tournaments-container">
        <h2 className="favorite-tournaments-title">Torneos Favoritos</h2>
        {favoriteTournaments.length > 0 ? (
          favoriteTournaments.map((tournament) => (
            <div key={tournament.id} className="favorite-tournament-card">
              <div className="favorite-tournament-info">
                <h3>{tournament.name}</h3>
                <p>Fecha: {tournament.date}</p>
                <p>Sede: {tournament.sedeName}</p>
                <p>
                  Equipos:{' '}
                  {tournament.teams && tournament.teams.length > 0
                    ? tournament.teams.join(', ')
                    : 'Sin equipos'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes torneos favoritos.</p>
        )}
      </div>

    </div>
  );
}

export default Inicio;

