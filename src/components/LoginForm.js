// components/LoginForm.js
import React, { useState } from 'react';
import '../styles/Login.css'; // Asegúrate de importar el CSS

function LoginForm({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username };
    localStorage.setItem('currentUser', JSON.stringify(user));
    setUser(user);
  };

  return (
    
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
