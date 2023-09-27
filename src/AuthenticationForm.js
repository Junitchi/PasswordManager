// AuthenticationForm.js
import React, { useState } from 'react';
import './AuthenticationForm.scss';

const AuthenticationForm = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');

  const handleAuthentication = (e) => {
    e.preventDefault();
    // Call the onAuthenticate callback and pass the entered password
    onAuthenticate(password);
  };

  return (
    <div className="authentication-form">
      <h2>Authentication Required</h2>
      <form onSubmit={handleAuthentication}>
        <div className="form-group">
          <label htmlFor="password">Enter Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Authenticate</button>
      </form>
    </div>
  );
};

export default AuthenticationForm;
