// PasswordForm.js
import React, { useState } from 'react';
import './PasswordForm.scss';

const {ipcRenderer} = window.require('electron')

const PasswordForm = ({masterPassword, setMasterPassword, setLatestPassword}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password === confirmPassword) {
      // Passwords match, handle submission here
      console.log('Password created successfully!');
      ipcRenderer.send('encryptPassword', password);
      setLatestPassword(password);
    //   setMasterPassword(password);
    } else {
      // Passwords do not match, show an error
      console.log('Passwords do not match. Please try again.');
    }
  };

  ipcRenderer.on('encryptedPassword', (event, data) => {
    if(data.error){
        console.error(data.error)
    } else {
        console.log(data);
        setMasterPassword(data);
    }
  })

  return (
    <div className="password-form">
      <h2>Create a New Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Password</button>
      </form>
    </div>
  );
};

export default PasswordForm;
