import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDeleteTask, onToggleComplete, filterOption, setAuthenticated }) => {
  // Filter tasks based on the selected option
  const filteredTasks = filterOption === 'favorite'
    ? tasks.filter(task => task.isFavorite)
    : filterOption === 'regular'
      ? tasks.filter(task => !task.isFavorite)
      : tasks;

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleComplete={onToggleComplete}
          setAuthenticated={setAuthenticated}
        />
      ))}
    </div>
  );
};

export default TaskList;
