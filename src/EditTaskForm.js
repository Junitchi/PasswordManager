// EditTaskForm.js
import React, { useState } from 'react';
import './EditTaskForm.scss';

const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    onSave(editedText);
  };

  return (
    <div className="edit-task-form">
      <textarea
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        rows={3}
      />
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTaskForm;
