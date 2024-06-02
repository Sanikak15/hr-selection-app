import React, { useState, useEffect } from "react";
import { getUniqueValues } from "../utils";
import './SearchBar.css'

function SearchBar({ onSearch, data, onSaveFilter }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    skills: "",
    experienceLevel: "",
    department: "",
  });

  useEffect(() => {
    handleSearch();
  }, [query, filters]);

  const handleSearch = () => {
    onSearch({ query, filters });
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSaveFilter = () => {
    onSaveFilter({ query, ...filters });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleQueryChange}
      />
      <select
        name="skills"
        className="filter-dropdown"
        value={filters.skills}
        onChange={handleFilterChange}
      >
        <option value="">All Skills</option>
        {getUniqueValues(data, "employeeSkills").map((skill) => (
          <option key={skill} value={skill}>
            {skill}
          </option>
        ))}
      </select>
      <select
        name="experienceLevel"
        className="filter-dropdown"
        value={filters.experienceLevel}
        onChange={handleFilterChange}
      >
        <option value="">All Experience Levels</option>
        {getUniqueValues(data, "employeeExperience").map((exp) => (
          <option key={exp} value={exp}>
            {exp}
          </option>
        ))}
      </select>
      <select
        name="department"
        className="filter-dropdown"
        value={filters.department}
        onChange={handleFilterChange}
      >
        <option value="">All Departments</option>
        {getUniqueValues(data, "employeeDepartment").map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
      <button onClick={handleSaveFilter}>Save Filter</button>
    </div>
  );
}

export default SearchBar;
