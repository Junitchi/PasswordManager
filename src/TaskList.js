import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDeleteTask, onToggleComplete, filterOption }) => {
  // Filter tasks based on the selected option
  const filteredTasks = filterOption === 'completed'
    ? tasks.filter(task => task.isComplete)
    : filterOption === 'active'
      ? tasks.filter(task => !task.isComplete)
      : tasks;

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
