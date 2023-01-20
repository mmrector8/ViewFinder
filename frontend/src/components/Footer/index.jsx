import React from "react";
import "./Footer.css";
import devprofile from "../../assets/dev-placeholder.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import kaushal from "../../assets/IMG_4043-circle.png";
import christine from "../../assets/IMG_5171-circle.png"
import nishant from "../../assets/IMG_8892-circle.png";
import morgan from "../../assets/IMG_3975-circle.png"

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
            <GitHubIcon />
            <LinkedInIcon sx={{ fontSize: "28px" }} />
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
            <GitHubIcon />
            <LinkedInIcon sx={{ fontSize: "28px" }} />
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
            <GitHubIcon />
            <LinkedInIcon sx={{ fontSize: "28px" }} />
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
            <GitHubIcon />
            <LinkedInIcon sx={{ fontSize: "28px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
