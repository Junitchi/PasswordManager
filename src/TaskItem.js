import React from 'react';

const TaskItem = ({ task, onDeleteTask, onToggleComplete }) => {
  const handleDeleteClick = () => {
    onDeleteTask(task.id);
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  return (
    <div className={`task-item ${task.isComplete ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.isComplete}
        onChange={handleToggleComplete}
      />
      <span>{task.text}</span>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default TaskItem;
