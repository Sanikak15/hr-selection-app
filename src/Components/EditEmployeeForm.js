// EditEmployeeForm.jsx
import React, { useState } from "react";

const EditEmployeeForm = ({ employee, onSave, onCancel }) => {
  const [employeeData, setEmployeeData] = useState({
    id: employee?.id || null,
    employeeName: employee?.employeeName || "",
    employeeDepartment: employee?.employeeDepartment || "",
    employeeSkills: employee?.employeeSkills || "",
    employeeGender: employee?.employeeGender || "",
    employeeExperience: employee?.employeeExperience || "",
    employeePerformanceReview: employee?.employeePerformanceReview || "",
    resume: employee?.resume || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmployeeData({ ...employeeData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employeeData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="employeeName"
          value={employeeData.employeeName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Department:
        <input
          type="text"
          name="employeeDepartment"
          value={employeeData.employeeDepartment}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Skills:
        <input
          type="text"
          name="employeeSkills"
          value={employeeData.employeeSkills}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Gender:
        <input
          type="text"
          name="employeeGender"
          value={employeeData.employeeGender}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Experience:
        <input
          type="text"
          name="employeeExperience"
          value={employeeData.employeeExperience}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Performance Review:
        <input
          type="text"
          name="employeePerformanceReview"
          value={employeeData.employeePerformanceReview}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Resume:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditEmployeeForm;
