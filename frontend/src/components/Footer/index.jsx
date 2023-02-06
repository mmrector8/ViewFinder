import React from "react";
import "./Footer.css";
import devprofile from "../../assets/dev-placeholder.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import kaushal from "../../assets/IMG_4043-circle.png";
import christine from "../../assets/IMG_5171-circle.png"
import nishant from "../../assets/IMG_8892-circle.png";
import morgan from "../../assets/IMG_3975-circle.png"
import { Link } from "@mui/material";

const Footer = () => {
  return (
    <div className="footer">
      <div className="dev-profile">
        <div className="dev-profile-left">
          <img src={christine} alt="developer profile picture" height="75px" />
        </div>
        <div className="dev-profile-right">
          <h1 className="dev-name">Christine Luu</h1>
          <div className="dev-links">
            <a href="https://github.com/celuu" target="_blank">
              {" "}
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/christineeluu/"
              target="_blank"
            >
              {" "}
              <LinkedInIcon sx={{ fontSize: "28px" }} />
            </a>
            <a href="https://celuu.github.io/portfolio/" target="_blank">
              <AccountBoxIcon sx={{ fontSize: "27.1px" }} />
            </a>
          </div>
        </div>
      </div>
      <div className="dev-profile">
        <div className="dev-profile-left">
          <img src={kaushal} alt="developer profile picture" height="75px" />
        </div>
        <div className="dev-profile-right">
          <h1 className="dev-name">Kaushal Kumbagowdana</h1>
          <div className="dev-links">
            <a href="https://github.com/kaushaltheeG" target="_blank">
              {" "}
              <GitHubIcon />
            </a>
            <a href="https://www.linkedin.com/in/kaushalsk/" target="_blank">
              {" "}
              <LinkedInIcon sx={{ fontSize: "28px" }} />
            </a>
            <a href="https://kaushalsk.com/" target="_blank">
              <AccountBoxIcon sx={{ fontSize: "27.1px" }} />
            </a>
          </div>
        </div>
      </div>
      <div className="dev-profile">
        <div className="dev-profile-left">
          <img src={morgan} alt="developer profile picture" height="75px" />
        </div>
        <div className="dev-profile-right">
          <h1 className="dev-name">Morgan Rector</h1>
          <div className="dev-links">
            <a
              href="https://github.com/mmrector8?tab=repositories"
              target="_blank"
            >
              {" "}
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/morgan-marie-rector/"
              target="_blank"
            >
              {" "}
              <LinkedInIcon sx={{ fontSize: "28px" }} />
            </a>
            <a
              href="https://mmrector8.github.io/mmrector8/"
              target="_blank"
              className="account-icon"
            >
              <AccountBoxIcon sx={{ fontSize: "27.1px" }} />
            </a>
          </div>
        </div>
      </div>
      <div className="dev-profile">
        <div className="dev-profile-left">
          <img src={nishant} alt="developer profile picture" height="75px" />
        </div>
        <div className="dev-profile-right">
          <h1 className="dev-name">Nishant Racherla</h1>
          <div className="dev-links">
            <a href="https://github.com/T1LT" target="_blank">
              {" "}
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/nishantracherla/"
              target="_blank"
            >
              {" "}
              <LinkedInIcon sx={{ fontSize: "28px" }} />
            </a>
            <a
              href="https://nishantracherla.com"
              target="_blank"
              className="account-icon"
            >
              <AccountBoxIcon sx={{ fontSize: "27.1px" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
