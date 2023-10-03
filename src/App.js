import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './Header';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterOptions from './FilterOptions';
import PasswordForm from './PasswordForm';
import AuthenticationForm from './AuthenticationForm';
import Footer from './Footer';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const [masterPassword, setMasterPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [latestPassword, setLatestPassword] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filterOption, setFilterOption] = useState('all');
  const [passwords, setPasswords] = useState("none"); // Use state to store passwords

  ipcRenderer.on('masterPasswordRemoved', (event) => {
    setMasterPassword('');
    // setAuthenticated(false);
    // setLatestPassword('');
  });

  useEffect(() => {
    // // Send a request to open the JSON file when passwords is "none"
    // if (passwords === "none") {
    //   ipcRenderer.send('openJSON', latestPassword);
    // }

    // Listen for the response from the main process
    ipcRenderer.on('openJSONResponse', (event, data) => {
      if (data.error) {
        console.error(data.error); // Log the error message
      } else {
        // console.log(data); // Log the parsed JSON data
        setPasswords(data); // Update passwords state
        setTasks(data); // Set tasks with the parsed data
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      ipcRenderer.removeAllListeners('openJSONResponse');
    }
  }, [passwords]); // Only run this effect when passwords changes

  useEffect(() => {
    if(masterPassword == ''){
      ipcRenderer.send("loadMasterPassword");
    }

    ipcRenderer.on('encryptedPassword', (event, data) => {
      if(data.error){
        console.error(data.error);
      } else {
        // console.log(data)
        setMasterPassword(data);

      }
    });

    return () => {
      ipcRenderer.removeAllListeners('encryptedPassword');
    }

  }, [masterPassword]);

  ipcRenderer.on('authenticateUser', (event, data) => {
    setAuthenticated(data);
    ipcRenderer.send('openJSON', latestPassword);
  });

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
    console.log(latestPassword);
    ipcRenderer.send('storeJSON', data, latestPassword);
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

  const handleCheckPassword = () => {

  }

  const handleRemovePassword = () => {
    ipcRenderer.send("removeMasterPassword");
  }

  const handleSetNasterPassword = (masterPass) => {
    setMasterPassword(masterPass);
    console.log("handle set master", masterPass)
    storePasswords(tasks);
  }

  return (
<div className="app">
      <Header />
      <div className="app-container">
        {masterPassword === '' ? (
          // Display PasswordForm if masterPassword is not set
          <PasswordForm
            masterPassword={masterPassword}
            setMasterPassword={handleSetNasterPassword}
            setLatestPassword={setLatestPassword}
          />
        ) : authenticated ? (
          // Display task-related content if authenticated
          <>
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
                setAuthenticated={setAuthenticated}
              />
            </div>
            <button onClick={ handleRemovePassword } >Change MASTER Password</button>
          </>
        ) : (
          // Display AuthenticationForm if not authenticated
          <AuthenticationForm
            onAuthenticate={(enteredPassword) => {
              setLatestPassword(enteredPassword);
              console.log("authentication request")
              ipcRenderer.send('authenticateMasterPassword', enteredPassword, masterPassword);
              
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
