import { useState } from "react";
import "./Header.css";
import { MdAdd } from "react-icons/md";

const Header = ({ onSearch, onFilter }) => {
  const [search, setSearch] = useState({ query: "", type: "name" });
  const [filter, setFilter] = useState({ query: "", type: "filterBy" });

  // Handle input field changes
  const handleSearchChange = (e) => {
    setSearch((prev) => ({ ...prev, query: e.target.value }));
  };

  const handleFilterChange = (e) => {
    const newFilter = { ...filter, query: e.target.value };
    setFilter(newFilter);
    onFilter(newFilter.type, newFilter.query);
  };

  // Handle search type selection
  const handleSearchTypeChange = (e) => {
    setSearch((prev) => ({ ...prev, type: e.target.value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(search.type, search.query);
    }
  };

  return (
    <header>
      <div className="search">
        <input
          type="text"
          placeholder="Search here ..."
          value={search.query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />

        <select
          name="search"
          id="search-option"
          value={search.type}
          onChange={handleSearchTypeChange}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      <div>
        <button type="button" className="btn add-contact">
          <span>
            <MdAdd />
          </span>
          <p>New Contact</p>
        </button>

        <select name="filter" id="filter" onChange={handleFilterChange}>
          <option value="">Filter By</option>
          <option value="recent">Recent</option>
          <option value="date">Date</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
