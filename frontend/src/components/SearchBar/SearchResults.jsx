import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { closeSearchModal } from "../../store/ui";
import "./Search.css";

const SearchResults = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const results = useSelector((store) => {
    if (store.search) return Object.values(store.search);
    else return [];
  });
  return (
    <div className="search-results-div">
      <h1>Results:</h1>
      {!results.length ? (
        <h1>No matches found!</h1>
      ) : (
        <ul className="search-results-ul">
          {results?.map((result, idx) => {
            if (result.county)
              return (
                <li
                  key={idx}
                  onClick={() => {
                    history.push(`/locations/${result._id}`);
                    dispatch(closeSearchModal());
                  }}
                >
                  {result.county}
                </li>
              );
            else if (result.username)
              return (
                <li
                  key={idx}
                  onClick={() => {
                    history.push(`/users/${result._id}`);
                    dispatch(closeSearchModal());
                  }}
                >
                  {result.username}
                </li>
              );
            else
              return (
                <li
                  key={idx}
                  onClick={() => {
                    history.push(`/spots/${result.spotId}`);
                    dispatch(closeSearchModal());
                  }}
                >
                  {result.description}
                </li>
              );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
