import React, { useState } from 'react';
import './App.scss';
import Header from './Header';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterOptions from './FilterOptions';
import Footer from './Footer';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterOption, setFilterOption] = useState('all');

  const onAddTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      isComplete: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  };

  const onDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const onToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
    );
    setTasks(updatedTasks);
  };

  // Calculate the number of remaining tasks
  const remainingTasks = tasks.filter((task) => !task.isComplete).length;

  // Function to clear completed tasks
  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.isComplete);
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
      <Footer remainingTasks={remainingTasks} clearCompleted={clearCompleted} />
    </div>
  );
};

export default App;
