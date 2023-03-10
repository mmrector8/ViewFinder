import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { clearResults, fetchResults } from "../../store/search";
import { useLocation } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import SearchResults from "./SearchResults";
import ClickAwayListener from '@mui/base/ClickAwayListener';
// import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [queryString, setQueryString] = useState("");
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const debounced = useDebounce(queryString, 500);

  useEffect(() => {
    if (debounced !== "") {
      const query = { body: queryString };
      dispatch(fetchResults(query));
    } else {
      dispatch(clearResults());
    }
  }, [debounced]);

  useEffect(() => {
    setQueryString("");
  }, [location.pathname]);

  return (
    <ClickAwayListener onClickAway={()=> setFocused(false)}>
      <form className="searchbar" onSubmit={handleSubmit}>
        <input
          type="text"
          name="queryString"
          placeholder="Search"
          autoComplete="off"
          onFocus={() => setFocused(true)}
          // onBlur={() => setTimeout(()=> setFocused(false), 1000)}
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
        {queryString !== "" && focused && <SearchResults />}
      </form>
    </ClickAwayListener>
  );
};

export default SearchBar;
