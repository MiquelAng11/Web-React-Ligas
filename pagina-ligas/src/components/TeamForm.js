// src/components/TeamForm.js
import React, { useState } from 'react';

function TeamForm({ onAddTeam }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [coach, setCoach] = useState('');
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState('');

  // Función para añadir un miembro a la lista de miembros
  const addMember = () => {
    if (newMember.trim()) {
      setMembers([...members, newMember.trim()]);
      setNewMember('');
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location || !coach || members.length === 0) {
      alert('Por favor, completa todos los campos y añade al menos un miembro.');
      return;
    }
    // Crea el objeto equipo y lo envía al componente padre
    const team = { name, location, coach, members };
    onAddTeam(team);

    // Limpiar el formulario
    setName('');
    setLocation('');
    setCoach('');
    setMembers([]);
    setNewMember('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del equipo:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del equipo"
          required
        />
      </div>

      <div>
        <label>Ubicación:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ubicación"
          required
        />
      </div>

      <div>
        <label>Entrenador:</label>
        <input
          type="text"
          value={coach}
          onChange={(e) => setCoach(e.target.value)}
          placeholder="Entrenador"
          required
        />
      </div>

      <div>
        <label>Miembros:</label>
        <div>
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Nombre del miembro"
          />
          <button type="button" onClick={addMember}>Añadir Miembro</button>
        </div>
        <ul>
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>

      <button type="submit">Añadir Equipo</button>
    </form>
  );
}

export default TeamForm;
