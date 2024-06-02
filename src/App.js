// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Fuse from "fuse.js";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import EditEmployeeForm from "./Components/EditEmployeeForm";
import SkillsDistribution from "./Components/SkillsDistribution";
import EmployeeDemographics from "./Components/EmployeeDemographics";
import PerformanceMetrics from "./Components/PerformanceMetrics";
import TaskList from "./Components/TaskList";
import TaskAssignmentForm from "./Components/TaskAssignmentForm";
import NotificationSystem, { notify } from "./Components/NotificationSystem";
import ViewEmployee from "./Components/ViewEmployee"; // Import the new component
import { getUniqueValues } from "./utils";

function App() {
  const initialData = [
    {
      id: 1,
      employeeName: "Pooja",
      employeeDepartment: "Salesforce",
      employeeSkills: "Leadership",
      employeeGender: "Female",
      employeeExperience: "2+",
      employeePerformanceReview: "Overall Good",
      resume: null,
    },
  ];

  const [employees, setEmployees] = useState(initialData);
  const [filteredEmployees, setFilteredEmployees] = useState(initialData);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [savedFilters, setSavedFilters] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [workflowStages, setWorkflowStages] = useState([
    "Resume Screening",
    "Skills Assessment",
    "Interviews",
  ]);
  const [currentStage, setCurrentStage] = useState(workflowStages[0]);

  const employeeDemographicsData = getUniqueValues(
    employees,
    "employeeGender"
  )?.map((gender) => ({
    label: gender,
    value: employees?.filter((e) => e.employeeGender === gender)?.length,
  }));

  const performanceMetricsData = [
    { quarter: "Q1", revenue: 1000, profit: 200 },
    { quarter: "Q2", revenue: 1500, profit: 300 },
    { quarter: "Q3", revenue: 2000, profit: 400 },
    { quarter: "Q4", revenue: 2500, profit: 500 },
  ];

  const skillsDistributionData = getUniqueValues(
    employees,
    "employeeSkills"
  )?.map((skill) => ({
    skill,
    count: employees?.filter((e) => e.employeeSkills === skill)?.length,
  }));

  const handleSearch = ({ query, filters }) => {
    const fuse = new Fuse(employees, {
      keys: [
        "employeeName",
        "employeeSkills",
        "employeeDepartment",
        "employeeExperience",
        "employeePerformanceReview",
      ],
      threshold: 0.3,
    });

    let results = employees;

    if (query) {
      results = fuse.search(query).map((result) => result.item);
    }

    if (filters.skills) {
      results = results.filter((employee) =>
        employee.employeeSkills
          .toLowerCase()
          .includes(filters.skills.toLowerCase())
      );
    }
    if (filters.experienceLevel) {
      results = results.filter(
        (employee) =>
          employee.employeeExperience.toLowerCase() ===
          filters.experienceLevel.toLowerCase()
      );
    }
    if (filters.department) {
      results = results.filter((employee) =>
        employee.employeeDepartment
          .toLowerCase()
          .includes(filters.department.toLowerCase())
      );
    }

    setFilteredEmployees(results);
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setShowEditForm(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEditForm(true);
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    notify("Employee deleted successfully!", "error");
  };

  const handleSaveEmployee = (updatedEmployee) => {
    let updatedEmployees = [...employees];
    if (updatedEmployee.id) {
      updatedEmployees = updatedEmployees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      );
      notify("Employee updated successfully!", "success");
    } else {
      updatedEmployee.id = Date.now();
      updatedEmployees.push(updatedEmployee);
      notify("Employee added successfully!", "success");
    }
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    setShowEditForm(false);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
  };

  const handleSaveFilter = (filter) => {
    setSavedFilters([...savedFilters, filter]);
    notify("Filter saved successfully!", "info");
  };

  const handleApplySavedFilter = (filter) => {
    handleSearch({ query: filter.query, filters: filter });
  };

  const handleAssignTask = (task) => {
    setTasks([...tasks, { ...task, status: "Pending" }]);
    notify("Task assigned successfully!", "info");
  };

  const handleUpdateTaskStatus = (index, status) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: status } : task
    );
    setTasks(updatedTasks);
    notify("Task status updated!", "info");
  };

  const handleStageChange = (stage) => {
    setCurrentStage(stage);
    notify(`Stage changed to ${stage}`, "info");
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.employeeName,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.employeeDepartment,
      sortable: true,
    },
    {
      name: "Skills",
      selector: (row) => row.employeeSkills,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.employeeGender,
      sortable: true,
    },
    {
      name: "Experience",
      selector: (row) => row.employeeExperience,
      sortable: true,
    },
    {
      name: "Performance Review",
      selector: (row) => row.employeePerformanceReview,
      sortable: true,
    },
    {
      name: "Resume",
      selector: (row) => (row.resume ? "Uploaded" : "Not Uploaded"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button onClick={() => handleEditEmployee(row)}>Edit</button>
          <button onClick={() => handleDeleteEmployee(row.id)}>Delete</button>
          <Link to={`/employee/${row.id}`}>View Details</Link>
        </div>
      ),
    },
  ];

  return (
    <Router>
      <div className="AppContainer">
        <NotificationSystem />
        <SearchBar
          onSearch={handleSearch}
          data={employees}
          onSaveFilter={handleSaveFilter}
          savedFilters={savedFilters}
        />
        {showEditForm && (
          <EditEmployeeForm
            employee={selectedEmployee}
            onSave={handleSaveEmployee}
            onCancel={handleCancelEdit}
          />
        )}
        <div className="saved-filters">
          <h3>Saved Filters</h3>
          {savedFilters.map((filter, index) => (
            <button key={index} onClick={() => handleApplySavedFilter(filter)}>
              {`Filter ${index + 1}`}
            </button>
          ))}
        </div>
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          highlightOnHover
          striped
        />
        <button onClick={handleAddEmployee}>Add Employee</button>
        <div>
          <h2>Workflow Stages</h2>
          <div>
            {workflowStages.map((stage) => (
              <button key={stage} onClick={() => handleStageChange(stage)}>
                {stage}
              </button>
            ))}
          </div>
        </div>

        <Routes>
          <Route
            path="/employee/:id"
            element={
              <ViewEmployee
                employees={employees}
                tasks={tasks.filter(
                  (task) => task.employeeId === selectedEmployee?.id
                )}
                handleUpdateTaskStatus={handleUpdateTaskStatus}
              />
            }
          />
        </Routes>
        <div>
          <h2>Skills Distribution</h2>
          <SkillsDistribution data={skillsDistributionData} />
          <h2>Employee Demographics :-</h2>
          <EmployeeDemographics data={employeeDemographicsData} />
          <h2>Performance Metrics</h2>
          <PerformanceMetrics data={performanceMetricsData} />
        </div>
      </div>
    </Router>
  );
}

export default App;
