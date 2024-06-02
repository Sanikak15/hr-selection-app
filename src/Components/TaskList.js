// TaskList.jsx
import React from "react";
import "./TaskList.css"; // Import CSS file

const TaskList = ({ tasks, handleUpdateStatus = () => {} }) => {
  return (
    <ul className="task-list">
      {" "}
      {/* Apply className */}
      {tasks?.map((task, index) => (
        <li key={index}>
          {task.description} - {task.status}
          <button onClick={() => handleUpdateStatus(index, "Completed")}>
            Mark as Completed
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
