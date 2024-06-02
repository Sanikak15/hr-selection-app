import React from "react";
import "./EmployeeName.css";

function EmployeeName(props) {
  const name = props.name;
  return <p className="EmployeeName">{name}</p>;
}

export default EmployeeName;
