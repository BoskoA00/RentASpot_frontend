import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import FormData from "form-data";
import { AuthContext } from "../Context/AuthContext";
import "../CSS/Register.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [FirstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState(1);
  const { isLightMode, setUserFunction } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleFName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLName = (e) => {
    setLastName(e.target.value);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword1 = (e) => {
    setConfirmPassword(e.target.value);
  };
  const PromenaSlike = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const handleTipPromena = (e) => {
    setType(e.target.value);
  };
  const handleRegister = async () => {
    if (FirstName.trim() === "") {
      setFirstNameError("Morate popuniti ovo polje");
      return;
    } else {
      setFirstNameError("");
    }
    if (lastName.trim() === "") {
      setLastNameError("Morate popuniti ovo polje");
      return;
    } else {
      setLastNameError("");
    }

    if (!isValidEmail(email)) {
      setEmailError("Neogovarajuci mail");
      return;
    } else if (email.length < 12) {
      setEmailError("Prekratak mail. Mora imati 12 ili vise karaktera");
    } else {
      setEmailError("");
    }
    if (password.length < 6) {
      setPasswordError("Lozinka je prekratka. Mora imati 6 ili vise karaktera");
      return;
    } else {
      setPasswordError("");
    }
    if (confirmPassword !== password) {
      setPasswordCheck("Lozinke nisu iste");
      return;
    } else {
      setPasswordCheck("");
    }
    const formData = new FormData();
    formData.append("FirstName", FirstName);
    formData.append("LastName", lastName);
    formData.append("Email", email);
    formData.append("Password", password);
    if (file === null || file === undefined) {
      setFileName("NoPic.png");
      formData.append("ImageName", fileName);
      formData.append("Image", null);
    } else {
      formData.append("Image", file);
      formData.append("ImageName", fileName);
    }
    formData.append("Role", type);

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "api/User/register",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const responseData = response.data;
      setUserFunction(responseData.user);
      localStorage.setItem("user", JSON.stringify(responseData.user));
      navigate("/home");
    } catch (e) {
      if (e.response.data.message === "Postoji već korisnik sa ovim imenom")
        setEmailError(e.response.data.message);
      else setPasswordError(e.response.data.message);
    }
  };
  return (
    <div
      className="register-container"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      <div
        className="register-container-main"
        style={isLightMode ? {} : { backgroundColor: "black" }}
      >
        <div className="register-firstName-lastName">
          <div className="register-firstName">
            <div
              className="register-firstName-label"
              style={isLightMode ? {} : { color: "white" }}
            >
              <h2>Ime:</h2>
            </div>
            <div className="register-firstName-input">
              <input
                style={
                  isLightMode
                    ? {}
                    : { backgroundColor: "#202020", color: "white" }
                }
                type="text"
                onChange={handleFName}
              />
            </div>
            <div
              style={isLightMode ? {} : { color: "white" }}
              className="firstName-Error"
            >
              {firstNameError}
            </div>
          </div>
          <div className="register-lastName">
            <div
              className="register-lastName-label"
              style={isLightMode ? {} : { color: "white" }}
            >
              <h2>Prezime:</h2>
            </div>
            <div className="register-lastName-input">
              <input
                style={
                  isLightMode
                    ? {}
                    : { backgroundColor: "#202020", color: "white" }
                }
                type="text"
                onChange={handleLName}
              />
            </div>
            <div
              style={isLightMode ? {} : { color: "white" }}
              className="lastName-Error"
            >
              {lastNameError}
            </div>
          </div>
        </div>
        <div
          className="register-email-label"
          style={isLightMode ? {} : { color: "white" }}
        >
          <h2>Email:</h2>
        </div>
        <div className="register-mail-input">
          <div>
            <input
              style={
                isLightMode
                  ? {}
                  : { backgroundColor: "#202020", color: "white" }
              }
              type="email"
              onChange={handleEmail}
              placeholder="primer@gmail.com"
            />
          </div>
          <div
            className="neispravan-email"
            style={isLightMode ? {} : { color: "white" }}
          >
            <h5>{emailError}</h5>
          </div>
        </div>

        <div
          className="register-lozinka-label"
          style={isLightMode ? {} : { color: "white" }}
        >
          <h2>Lozinka:</h2>
        </div>
        <div className="register-lozinka-input">
          <div>
            <input
              style={
                isLightMode
                  ? {}
                  : { backgroundColor: "#202020", color: "white" }
              }
              type="password"
              onChange={handlePassword}
            />
          </div>
          <div
            className="register-neispravna-lozinka"
            style={isLightMode ? {} : { color: "white" }}
          >
            {passwordError}
          </div>
        </div>
        <div
          className="register-lozinka-label"
          style={isLightMode ? {} : { color: "white" }}
        >
          <h2>Unesite ponovo lozinku:</h2>
        </div>
        <div className="register-lozinka-input">
          <div>
            <input
              style={
                isLightMode
                  ? {}
                  : { backgroundColor: "#202020", color: "white" }
              }
              type="password"
              onChange={handlePassword1}
            />
          </div>
          <div
            style={isLightMode ? {} : { color: "white" }}
            className="register-neispravna-potvrda"
          >
            {passwordCheck}
          </div>
        </div>
        <div
          className="register-slika-label"
          style={isLightMode ? {} : { color: "white" }}
        >
          <h2>Odaberite sliku:</h2>
        </div>
        <div className="register-slika-input">
          <div>
            <Input
              type="file"
              fullWidth
              color="primary"
              onChange={PromenaSlike}
              sx={isLightMode ? {} : { backgroundColor: "#202020" }}
            />
          </div>
        </div>
        <div className="register-role">
          <div
            className="register-role-label"
            style={isLightMode ? {} : { color: "white" }}
          >
            <h2>Uloga:</h2>
          </div>
          <div className="register-role-input">
            <select
              style={
                isLightMode
                  ? {}
                  : { backgroundColor: "#202020", color: "white" }
              }
              defaultValue={type}
              value={type}
              onChange={handleTipPromena}
            >
              <option value={0}>Kupac</option>
              <option value={1}>Prodavac</option>
            </select>
          </div>
        </div>
        <div className="register-button">
          <Button
            sx={isLightMode ? {} : { backgroundColor: "#202020" }}
            variant="contained"
            fullWidth
            onClick={handleRegister}
          >
            Registruj se
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
