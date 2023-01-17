import React from "react";
import "./Footer.css";
import devprofile from "../../assets/dev-placeholder.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <div className="footer">
      <div className="dev-profile">
        <div className="dev-profile-left">
          <img src={devprofile} alt="developer profile picture" height="75px" />
        </div>
        <div className="dev-profile-right">
          <h1 className="dev-name">Christine Luu</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="dev-links">
            <GitHubIcon />
            <LinkedInIcon sx={{ fontSize: "28px" }} />
          </div>
        </div>
      </div>
      <div className="dev-profile">
        <div className="dev-profile-left">
          <img src={devprofile} alt="developer profile picture" height="75px" />
        </div>
        <div className="dev-profile-right">
          <h1 className="dev-name">Kaushal Kumbagowdana</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="dev-links">
            <GitHubIcon />
            <LinkedInIcon sx={{ fontSize: "28px" }} />
          </div>
        </div>
      </div>
      <div className="dev-profile">
        <div className="dev-profile-left">
          <img src={devprofile} alt="developer profile picture" height="75px" />
        </div>
        <div className="dev-profile-right">
          <h1 className="dev-name">Morgan Rector</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="dev-links">
            <GitHubIcon />
            <LinkedInIcon sx={{ fontSize: "28px" }} />
          </div>
        </div>
      </div>
      <div className="dev-profile">
        <div className="dev-profile-left">
          <img src={devprofile} alt="developer profile picture" height="75px" />
        </div>
        <div className="dev-profile-right">
          <h1 className="dev-name">Nishant Racherla</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="dev-links">
            <GitHubIcon />
            <LinkedInIcon sx={{ fontSize: "28px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
