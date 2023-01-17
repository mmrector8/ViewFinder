import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/session";
import SearchBar from "../SearchBar";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const handleUpload = (e) => {
    e.preventDefault();
    // open upload photo modal here
  };

  const handleUserIcon = (e) => {
    e.preventDefault();
    // open dropdown here
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={handleUpload}
          >
            <PhotoCamera />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={handleUserIcon}
          >
            <AccountCircleIcon />
          </IconButton>
        </div>
      );
    } else {
      // remove Link and add button to open respective modals
      return (
        <div className="links">
          <Link to={"/signup"}>
            <button className="navbar-button">Signup</button>
          </Link>
          <Link to={"/login"}>
            <button className="navbar-button">Login</button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="navbar">
      <h1>ViewFinder</h1>
      <SearchBar />
      {getLinks()}
    </div>
  );
};

export default NavBar;
