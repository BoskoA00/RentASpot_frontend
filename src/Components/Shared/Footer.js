import React, { useContext } from "react";
import "../../CSS/Footer.css";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";
import XIcon from "@mui/icons-material/X";
const Footer = () => {
  const { isLightMode } = useContext(AuthContext);
  return (
    <div
      className="footer"
      style={isLightMode ? {} : { backgroundColor: "black" }}
    >
      <div className="logoIIme-f">
        <div className="logo-f">
          <Link to="/home">
            {isLightMode ? (
              <img src="/Icons/LogoLight.png" alt="LOGO" />
            ) : (
              <img src="/Icons/LogoDark.png" alt="LOGO" />
            )}
          </Link>
        </div>
        <div className="app-name-f">
          <Link
            to="/home"
            style={
              isLightMode ? {} : { color: "white", textDecoration: "none" }
            }
          >
            <h1>RentASpot</h1>
          </Link>
        </div>
      </div>

      <div className="socijalne_mreze">
        <div style={isLightMode ? { color: "black" } : { color: "white" }}>
          <h2>Pratite nas na drustvenim mrezama</h2>
        </div>
        <div className="socijalne_ikonice">
          <div>
            <a href="https://www.facebook.com/" target="_blank">
              <FacebookIcon
                fontSize="large"
                sx={isLightMode ? {} : { color: "white" }}
              />
            </a>
          </div>
          <div>
            <a href="https://www.instagram.com" target="_blank">
              <InstagramIcon
                fontSize="large"
                sx={isLightMode ? {} : { color: "white" }}
              />
            </a>
          </div>
          <div>
            <a href="https://www.reddit.com" target="_blank">
              <RedditIcon
                fontSize="large"
                sx={isLightMode ? {} : { color: "white" }}
              />
            </a>
          </div>
          <div>
            <a href="https://www.x.com" target="_blank">
              <XIcon
                sx={isLightMode ? {} : { color: "white" }}
                fontSize="large"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
