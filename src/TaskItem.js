import React from 'react';
import "./TaskItem.scss"

const {clipboard} = window.require('electron');

const TaskItem = ({ task, onDeleteTask, onToggleComplete }) => {
  const handleDeleteClick = () => {
    onDeleteTask(task.id);
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleCopyClick = () => {
    clipboard.writeText(task.password);
  }

  return (
    <div className={`task-item ${task.isFavorite ? 'favorite' : ''}`}>
      <input
        type="checkbox"
        checked={task.isFavorite}
        onChange={handleToggleComplete}
      />
      <span>{task.site}</span>
      <span>{task.username}</span>
      <span>{task.password}</span>
      
      <button onClick={handleDeleteClick}>Delete</button>
      <button onClick={handleCopyClick}>Copy</button>
    </div>
  );
};

export default TaskItem;
