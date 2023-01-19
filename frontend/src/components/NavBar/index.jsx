import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import SearchBar from "../SearchBar";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../assets/viewfinderlogo.png";
import {
  openSigninModal,
  openSignupModal,
  openUserModal,
  openUploadModal
} from "../../store/ui";


const NavBar = () => {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUploadIcon = (e) => {
    e.preventDefault();
    dispatch(openUploadModal());
  }

  const handleUserIcon = (e) => {
    e.preventDefault();
    dispatch(openUserModal());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links">
          <IconButton
            color="disabled"
            aria-label="upload picture"
            component="label"
            onClick={handleUploadIcon}
          >
            <PhotoCamera sx={{ color: "black" }} />
          </IconButton>
          <IconButton
            color="disabled"
            aria-label="upload picture"
            component="label"
            onClick={handleUserIcon}
          >
            <AccountCircleIcon sx={{ color: "black" }} />
          </IconButton>
        </div>
      );
    } else {
      return (
        <div className="links">
          <button
            className="navbar-button"
            onClick={() => dispatch(openSignupModal())}
          >
            Signup
          </button>
          <button
            className="navbar-button"
            onClick={() => dispatch(openSigninModal())}
          >
            Login
          </button>
        </div>
      );
    }
  };

  return (
    <div className="navbar">
      <h1 className="logo" onClick={() => history.push("/")}><img src={logo} alt="logo" width="200px" /></h1>
      <SearchBar />
      {getLinks()}
    </div>
  );
};

export default NavBar;
