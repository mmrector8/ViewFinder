import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearResults, fetchResults } from "../../store/search";
import { useLocation } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import SearchResults from "./SearchResults";
// import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [queryString, setQueryString] = useState("");
  const [queryType, setQueryType] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const capitalize = (string) => string[0].toUpperCase() + string.substring(1);
  const debounced = useDebounce(queryString, 500);

  useEffect(() => {
    if (debounced !== "") {
      const query = { body: queryString, type: queryType };
      dispatch(fetchResults(query));
    } else {
      dispatch(clearResults());
    }
  }, [debounced]);

  useEffect(() => {
    setQueryString("");
    setQueryType("");
  }, [location.pathname]);

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <select value={queryType} onChange={(e) => setQueryType(e.target.value)}>
        <option value="">Search Type</option>
        <option value="users">Users</option>
        <option value="photos">Photos</option>
        <option value="locations">Locations</option>
      </select>
      <input
        type="text"
        name="queryString"
        placeholder={
          queryType === ""
            ? "Select a Search Type"
            : `Search ${capitalize(queryType)}`
        }
        autoComplete="off"
        disabled={queryType === ""}
        value={queryString}
        onChange={(e) => setQueryString(e.target.value)}
      />
      {queryString !== "" && <SearchResults />}
      {/* <SearchIcon /> */}
      {/* <button className="navbar-button">Search</button> */}
    </form>
  );
};

export default SearchBar;
