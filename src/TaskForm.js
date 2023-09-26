import React, { useState } from 'react';
import './TaskForm.scss';

const TaskForm = ({ onAddTask }) => {

  const [username, setUsername] = useState('');
  const [site, setSite] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false); // New state for showing alert

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting")
    // if (username.trim() !== '') {
      if (username.trim() !== '' && site.trim() !== '' && password.trim() !== '') {
        onAddTask(username, site, password);
        setUsername('');
        setPassword('');
        setSite('');
      } else {
        console.log("attempting to show alert")
        setShowAlert(true); // Show the alert
      }
    // }
  };

  const closeAlert = () => {
    setShowAlert(false); // Close the alert
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Site..."
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      
      {/* Display the alert div if showAlert is true */}
      {showAlert && (
        <div className="alert-container">
          <div className="alert">
            <p>Not all inputs have been filled.</p>
            <button onClick={closeAlert}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
