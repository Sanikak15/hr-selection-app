import React from 'react'
import './EmployeeData.css'

function EmployeeData(props) {
    const department = props.department;
    const skills = props.skills;
    const experience = props.experience;
    const performanceReview = props.performanceReview;


  return (
    <div className="EmployeeData">
      <span>{department}</span>
      <span>{skills}</span>
      <span> {experience}</span>
      <span>{performanceReview}</span>
    </div>
  );
}

export default EmployeeData