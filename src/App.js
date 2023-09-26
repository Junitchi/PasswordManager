import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './Header';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterOptions from './FilterOptions';
import Footer from './Footer';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterOption, setFilterOption] = useState('all');
  const [passwords, setPasswords] = useState("none"); // Use state to store passwords

  useEffect(() => {
    // Send a request to open the JSON file when passwords is "none"
    if (passwords === "none") {
      ipcRenderer.send('openJSON');
    }

    // Listen for the response from the main process
    ipcRenderer.on('openJSONResponse', (event, data) => {
      if (data.error) {
        console.error(data.error); // Log the error message
      } else {
        console.log(data); // Log the parsed JSON data
        setPasswords(data); // Update passwords state
        setTasks(data); // Set tasks with the parsed data
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      ipcRenderer.removeAllListeners('openJSONResponse');
    }
  }, [passwords]); // Only run this effect when passwords changes

  // Rest of your component code...

  const onAddTask = (username, site, password) => {
    const newTask = {
      id: Date.now(),
      username: username,
      isFavorite: false,
      site: site,
      password: password,
    };

    const updatedTasks = [...tasks, newTask];
    storePasswords(updatedTasks);
    setTasks(updatedTasks);
  };



  const storePasswords = (data) => {
    ipcRenderer.send('storeJSON', data);
  }

  const onDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    storePasswords(updatedTasks);
    setTasks(updatedTasks);
  };

  const onToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
    );
    setTasks(updatedTasks);
  };

  // Calculate the number of remaining tasks
  const remainingTasks = tasks.filter((task) => !task.isFavorite).length;

  // Function to clear completed tasks
  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.isFavorite);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <TaskForm onAddTask={onAddTask} />
        <div className="task-content">
          <FilterOptions
            filterOption={filterOption}
            setFilterOption={setFilterOption}
          />
          <TaskList
            tasks={tasks}
            onDeleteTask={onDeleteTask}
            onToggleComplete={onToggleComplete}
            filterOption={filterOption}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
