import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.js";
import Axios from "axios";
import "../../CSS/Navigation.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HouseIcon from "@mui/icons-material/House";
import { withTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
const MyNavigation = () => {
  const { isLightMode, setIsLightModeFunction, user, setUserFunction } =
    useContext(AuthContext);
  const isSmallScreen = useMediaQuery("(max-width: 800px)");

  const navigate = useNavigate();
  const logoutUserHandler = () => {
    setUserFunction(null);
    localStorage.removeItem("user");
    Axios.defaults.headers.common["Authorization"] = "";
    navigate("/home");
  };
  return (
    <div
      className="navigation"
      style={isLightMode ? {} : { backgroundColor: "black" }}
    >
      <div className="logoIIme">
        <div className="logo">
          <Link to="/home">
            {isLightMode ? (
              <img src="/Icons/LogoLight.png" alt="LOGO" />
            ) : (
              <img src="/Icons/LogoDark.png" alt="LOGO" />
            )}
          </Link>
        </div>
        {!isSmallScreen && (
          <div className="app-name">
            <Link
              to="/home"
              style={
                isLightMode ? {} : { color: "white", textDecoration: "none" }
              }
            >
              <h1>RentASpot</h1>
            </Link>
          </div>
        )}
      </div>
      <div className="dugmeiNav">
        <div className="dugme-nav">
          <button onClick={setIsLightModeFunction}>
            {isLightMode ? (
              <DarkModeIcon />
            ) : (
              <DarkModeIcon sx={{ color: "white" }} />
            )}
          </button>
        </div>
        <div className="navigation-links">
          <div className="navigation-link">
            <Link style={isLightMode ? {} : { color: "white" }} to="/home">
              Pocetna
            </Link>
          </div>
          <div className="navigation-link">
            <Link style={isLightMode ? {} : { color: "white" }} to="/forum">
              Forum
            </Link>
          </div>
          {user && user.role === 2 && (
            <div className="navigation-link">
              <Link
                style={isLightMode ? {} : { color: "white" }}
                to="/korisnici"
              >
                Svi korisnici
              </Link>
            </div>
          )}
          {user && (
            <div className="navigation-link">
              <Link style={isLightMode ? {} : { color: "white" }} to="/profil">
                Profil
              </Link>
            </div>
          )}
          {user && (
            <div className="navigation-link">
              <button
                style={isLightMode ? {} : { color: "white" }}
                className="logout-button"
                onClick={logoutUserHandler}
              >
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div className="navigation-link">
              <Link style={isLightMode ? {} : { color: "white" }} to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyNavigation;
