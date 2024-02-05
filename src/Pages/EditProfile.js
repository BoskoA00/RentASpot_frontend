import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormLabel, Input } from "@mui/material";
import "../CSS/EditProfile.css";
import axios from "axios";

const EditProfile = () => {
  const { user, isLightMode } = useContext(AuthContext);
  const navigate = useNavigate();
  const [korisnik, setKorisnik] = useState({});
  const { id } = useParams();
  const [firstName, setFirstName] = useState(
    korisnik ? korisnik.firstName : ""
  );
  const [lastName, setLastName] = useState(korisnik ? korisnik.lastName : "");
  const [email, setEmail] = useState(korisnik ? korisnik.email : "");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (user === null || !(user && user.role === 2)) {
      navigate("/login");
    }
  }, [user, navigate]);
  const handleSubmit = async () => {
    try {
      const resp = await axios.put(
        "http://boskowindows-001-site1.anytempurl.com/api/User",
        {
          id: korisnik.id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }
      );
      navigate(`/user/${korisnik.id}`);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  const PokupiKorisnika = async () => {
    try {
      const resp = await axios.get(
        `http://boskowindows-001-site1.anytempurl.com/api/User/${id}`
      );
      setKorisnik(resp.data);
      setEmail(resp.data.email);
      setFirstName(resp.data.firstName);
      setLastName(resp.data.lastName);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  useEffect(() => {
    PokupiKorisnika();
    setEmail(korisnik.email);
    setFirstName(korisnik.firstName);
    setLastName(korisnik.lastName);
    console.log(korisnik);
  }, []);
  return (
    <div
      className="editProfile-main"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      <div
        className="editProfile-form"
        style={isLightMode ? {} : { backgroundColor: "black" }}
      >
        <div className="ImeiPrezime">
          <div className="Ime">
            <div>
              <FormLabel
                sx={
                  isLightMode
                    ? { color: "black", fontSize: "1.5rem" }
                    : { color: "white", fontSize: "1.5rem" }
                }
              >
                Ime:
              </FormLabel>
            </div>
            <div>
              <Input
                sx={
                  isLightMode
                    ? { color: "#ddf2fd", fontSize: "1.5rem" }
                    : { backgroundColor: "#202020", color: "white" }
                }
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="Prezime">
            <div>
              <FormLabel
                sx={
                  isLightMode
                    ? { color: "black", fontSize: "1.5rem" }
                    : { color: "white", fontSize: "1.5rem" }
                }
              >
                Prezime:
              </FormLabel>
            </div>
            <div>
              <Input
                sx={
                  isLightMode
                    ? { color: "#ddf2fd", fontSize: "1.5rem" }
                    : {
                        backgroundColor: "#202020",
                        color: "white",
                        fontSize: "1.5rem",
                      }
                }
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="Email">
          <div>
            <FormLabel
              sx={
                isLightMode
                  ? { color: "black ", fontSize: "1.5rem" }
                  : { color: "white", fontSize: "1.5rem" }
              }
            >
              Email:
            </FormLabel>
          </div>
          <div>
            <Input
              sx={
                isLightMode
                  ? { color: "#ddf2fd", fontSize: "1.5rem" }
                  : {
                      backgroundColor: "#202020",
                      color: "white",
                      fontSize: "1.5rem",
                    }
              }
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>
        </div>
        <div className="password">
          <div>
            <FormLabel
              sx={
                isLightMode
                  ? { color: "black", fontSize: "1.5rem" }
                  : { color: "white", fontSize: "1.5rem" }
              }
            >
              Password:
            </FormLabel>
          </div>
          <div>
            <Input
              sx={
                isLightMode
                  ? { color: "#ddf2fd", fontSize: "1.5rem" }
                  : {
                      backgroundColor: "#202020",
                      color: "white",
                      fontSize: "1.5rem",
                    }
              }
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className="dugme">
        <Button
          sx={isLightMode ? {} : { backgroundColor: "black" }}
          variant="contained"
          onClick={handleSubmit}
          fullWidth
        >
          Potvrdi izmene
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
