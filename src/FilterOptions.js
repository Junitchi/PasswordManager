import React from 'react';
import './FilterOptions.scss';

const FilterOptions = ({ filterOption, setFilterOption }) => {
  const handleFilterChange = (e) => {
    const selectedOption = e.target.value;
    setFilterOption(selectedOption);
  };

  return (
    <div className="filter-options">
      <label className="filter-label">Filter by:</label>
      <select className="filter-select" onChange={handleFilterChange} value={filterOption}>
        <option value="all">All</option>
        <option value="favorite">Favorite</option>
        <option value="regular">Regular</option>
      </select>
    </div>
  );
};

export default FilterOptions;
