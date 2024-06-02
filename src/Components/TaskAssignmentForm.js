// TaskAssignmentForm.jsx
import React, { useState } from "react";
import "./TaskAssignmentForm.css"; // Import CSS file for styling

const TaskAssignmentForm = ({ employeeId, assignTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    assignTask(employeeId, task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-assignment-form">
      {" "}
      {/* Apply className */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task description"
        className="task-input"
      />
      <button type="submit" className="assign-button">
        Assign Task
      </button>{" "}
      {/* Apply className */}
    </form>
  );
};

export default TaskAssignmentForm;
