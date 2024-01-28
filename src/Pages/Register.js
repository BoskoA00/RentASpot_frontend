import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import FormData from "form-data";
import { AuthContext } from "../Context/AuthContext";
import "../CSS/Register.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [ime, setIme] = useState("");
  const [imeError, setImeError] = useState("");
  const [prezimeError, setPrezimeError] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [lozinkaError, setLozinkaError] = useState("");
  const [password1, setPassword1] = useState("");
  const [proveraLozinke, setProveraLozinke] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [tip, setTip] = useState(1);
  const { isLightMode, setUserFunction } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleFName = (e) => {
    setIme(e.target.value);
  };
  const handleLName = (e) => {
    setPrezime(e.target.value);
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
    setPassword1(e.target.value);
  };
  const PromenaSlike = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const handleTipPromena = (e) => {
    setTip(e.target.value);
  };
  const handleRegister = async () => {
    if (ime.trim() === "") {
      setImeError("Morate popuniti ovo polje");
      return;
    } else {
      setImeError("");
    }
    if (prezime.trim() === "") {
      setPrezimeError("Morate popuniti ovo polje");
      return;
    } else {
      setPrezimeError("");
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
      setLozinkaError("Lozinka je prekratka. Mora imati 6 ili vise karaktera");
      return;
    } else {
      setLozinkaError("");
    }
    if (password1 != password) {
      setProveraLozinke("Lozinke nisu iste");
      return;
    } else {
      setProveraLozinke("");
    }
    const formData = new FormData();
    formData.append("FirstName", ime);
    formData.append("LastName", prezime);
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
    formData.append("Role", tip);

    try {
      const response = await axios.post(
        "http://boskowindows-001-site1.anytempurl.com/api/User/register",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const responseData = response.data;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseData.token}`;
      setUserFunction(responseData.user);
      localStorage.setItem("user", JSON.stringify(responseData.user));
      navigate("/home");
    } catch (e) {
      if (e.response.data.message === "Postoji već korisnik sa ovim imenom")
        setEmailError(e.response.data.message);
      else setLozinkaError(e.response.data.message);
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
        <div className="register-ime-prezime">
          <div className="register-ime">
            <div
              className="register-ime-label"
              style={isLightMode ? {} : { color: "white" }}
            >
              <h2>Ime:</h2>
            </div>
            <div className="register-ime-input">
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
              className="ime-Error"
            >
              {imeError}
            </div>
          </div>
          <div className="register-prezime">
            <div
              className="register-prezime-label"
              style={isLightMode ? {} : { color: "white" }}
            >
              <h2>Prezime:</h2>
            </div>
            <div className="register-prezime-input">
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
              className="prezime-Error"
            >
              {prezimeError}
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
            {lozinkaError}
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
            {proveraLozinke}
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
              defaultValue={tip}
              value={tip}
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
