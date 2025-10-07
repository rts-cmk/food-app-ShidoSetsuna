import "./search.css";
import { useState } from "react";
import filterIcon from "../../assets/filter.svg";

export default function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  // No work :(
  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-container">
      <form className="search-input-group" onSubmit={handleSubmit}>
        <button type="button" className="search-button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>

      <button className="filter-button">
        <img src={filterIcon} alt="Filter" className="filter-icon" />
      </button>
    </div>
  );
}
