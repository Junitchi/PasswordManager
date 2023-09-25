import React from 'react';
import './Footer.scss';

const Footer = ({ remainingTasks, clearCompleted }) => {
  return (
    <div className="footer">
      <div className="task-count">
        {remainingTasks} tasks remaining
      </div>
      <div className="clear-completed">
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
};

export default Footer;
