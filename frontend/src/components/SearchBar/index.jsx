import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [queryString, setQueryString] = useState("");
  const [queryType, setQueryType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { body: queryString, type: queryType };
    // dispatch search request here
    console.log(query);
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <SearchIcon />
      <input
        type="text"
        name="queryString"
        placeholder="Search"
        value={queryString}
        onChange={(e) => setQueryString(e.target.value)}
      />
      <select value={queryType} onChange={(e) => setQueryType(e.target.value)}>
        <option value="">Search Type</option>
        <option value="users">Users</option>
        <option value="photos">Photos</option>
        <option value="locations">Locations</option>
      </select>
      <button className="navbar-button">Search</button>
    </form>
  );
};

export default SearchBar;
