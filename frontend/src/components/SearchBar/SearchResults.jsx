import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RoomIcon from "@mui/icons-material/Room";
import PersonIcon from "@mui/icons-material/Person";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import "./Search.css";

const SearchResults = () => {
  const history = useHistory();
  const results = useSelector((store) => {
    if (store.search) return Object.values(store.search);
    else return [];
  });
  return (
    <>
      {results.length ? (
        <div className="search-results-div">
          <h1>Results:</h1>
          <ul className="search-results-ul">
            {results?.map((result, idx) => {
              if (result.county)
                return (
                  <li
                    className="result-item truncate"
                    key={idx}
                    onClick={() => {
                      history.push(`/locations/${result._id}`);
                    }}
                  >
                    <RoomIcon sx={{ mr: "5px", opacity: "0.4" }} />{" "}
                    {result.county}
                  </li>
                );
              else if (result.username)
                return (
                  <li
                    className="result-item truncate"
                    key={idx}
                    onClick={() => history.push(`/users/${result._id}`)}
                  >
                    <PersonIcon sx={{ mr: "5px", opacity: "0.4" }} />
                    {result.username}
                  </li>
                );
              else if (result.description)
                return (
                  <li
                    className="result-item truncate"
                    key={idx}
                    onClick={() => history.push(`/spots/${result.spotId}`)}
                  >
                    <InsertPhotoIcon sx={{ mr: "5px", opacity: "0.4" }} />
                    {result.description}
                  </li>
                );
              else
                return (
                  <li className="result-item" key={idx}>
                    No Results Found!
                  </li>
                );
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchResults;
