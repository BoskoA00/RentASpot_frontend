import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormLabel, Input } from "@mui/material";
import "../CSS/EditProfile.css";
import axios from "axios";

const EditProfile = () => {
  const { user, isLightMode } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState({});
  const { id } = useParams();
  const [firstName, setFirstName] = useState(
    profileUser ? profileUser.firstName : ""
  );
  const [lastName, setLastName] = useState(
    profileUser ? profileUser.lastName : ""
  );
  const [email, setEmail] = useState(profileUser ? profileUser.email : "");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const resp = await axios.put(
        process.env.REACT_APP_API_URL + "api/User",
        {
          id: profileUser.id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        {
          headers,
        }
      );
      navigate(`/user/${profileUser.id}`);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  const getUser = async () => {
    try {
      const resp = await axios.get(
        process.env.REACT_APP_API_URL + `api/User/${id}`
      );
      setProfileUser(resp.data);
      setEmail(resp.data.email);
      setFirstName(resp.data.firstName);
      setLastName(resp.data.lastName);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  useEffect(() => {
    getUser();
    setEmail(profileUser.email);
    setFirstName(profileUser.firstName);
    setLastName(profileUser.lastName);
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
        <div className="firstNameAndLastName">
          <div className="firstName">
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
      <div className="button">
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
