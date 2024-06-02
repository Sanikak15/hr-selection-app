// ViewEmployee.jsx
import React from "react";
import { useParams } from "react-router-dom";
import TaskList from "./TaskList";
import TaskAssignmentForm from "./TaskAssignmentForm";

const ViewEmployee = ({
  employees,
  tasks,
  handleUpdateTaskStatus,
  assignTask,
}) => {
  const { id } = useParams();
  const employee = employees.find((emp) => emp.id === parseInt(id));

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div>
      <h2>{employee.employeeName}</h2>
      <p>Department: {employee.employeeDepartment}</p>
      <p>Skills: {employee.employeeSkills}</p>
      <p>Gender: {employee.employeeGender}</p>
      <p>Experience: {employee.employeeExperience}</p>
      <p>Performance Review: {employee.employeePerformanceReview}</p>
      <h3>Assigned Tasks</h3>
      <TaskAssignmentForm assignTask={assignTask} employeeId={employee.id} />
      <TaskList tasks={tasks} handleUpdateStatus={handleUpdateTaskStatus} />
    </div>
  );
};

export default ViewEmployee;
