import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.js";
import Axios from "axios";
import ".././CSS/Login.css";
const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [emailError, setError] = useState(null);
  const [passwordError, setPassError] = useState(null);
  const { setUserFunction, isLightMode } = useContext(AuthContext);
  const navigate = useNavigate();

  const PromenaEmaila = (e) => {
    setEmail(e.target.value);
  };
  const PromenaLozinke = (e) => {
    setPassword(e.target.value);
  };
  const loginUserHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setPassError(null);
    if (Email.length <= 0) {
      setError("Morate uneti mail");
      return;
    } else {
      setError(null);
    }
    if (Password.length < 7) {
      setPassError("Lozinka mora imati 7 karaktera");
      return;
    } else {
      setPassError(null);
    }
    try {
      setLoading(true);

      const response = await Axios.post(
        "http://boskowindows-001-site1.anytempurl.com/api/User/login",
        {
          email: Email,
          password: Password,
        }
      );
      const responseData = response.data;
      Axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseData.token}`;

      setUserFunction(responseData.user);

      localStorage.setItem("user", JSON.stringify(responseData.user));
      navigate("/home");
    } catch (e) {
      if (e.response.data.message === "Ne postoji ovaj korisnik")
        setError(e.response.data.message);
      else if (e.response.data.message === "Neispravni podaci") {
        setPassError(e.response.data.message);
      } else {
        console.log("Error:" + e.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="login-container"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      {Loading && <p>Loading...</p>}
      {!Loading && (
        <div
          className="login-container-main-div"
          style={
            isLightMode
              ? {}
              : { backgroundColor: "black", border: "3px solid black" }
          }
        >
          <div
            className="login-email-label"
            style={isLightMode ? {} : { color: "white" }}
          >
            <h2>Email:</h2>
          </div>
          <div className="login-email-input">
            <div>
              <input
                type="email"
                onChange={PromenaEmaila}
                placeholder="primer@gmail.com"
              />
            </div>
            <div
              className="error-div"
              style={isLightMode ? {} : { color: "white" }}
            >
              {emailError}
            </div>
          </div>
          <div
            className="login-password-label"
            style={isLightMode ? {} : { color: "white" }}
          >
            <h2>Lozinka:</h2>
          </div>
          <div className="login-password-input">
            <div>
              <input type="password" onChange={PromenaLozinke} />
            </div>
            <div
              style={isLightMode ? {} : { color: "white" }}
              className="error-div"
            >
              {passwordError}
            </div>
          </div>
          <div className="login-button">
            <Button
              sx={isLightMode ? {} : { backgroundColor: "#202020" }}
              variant="contained"
              onClick={loginUserHandler}
              fullWidth
            >
              Login
            </Button>
          </div>
          <div className="login-registration-link">
            <Link
              style={
                isLightMode
                  ? {
                      textDecoration: "none",
                      color: "#427d9d",
                    }
                  : { textDecoration: "none", color: "white" }
              }
              to="/register"
            >
              <h2>Nemate nalog? Registrujte se ovde.</h2>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
