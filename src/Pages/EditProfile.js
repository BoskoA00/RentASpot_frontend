import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, FormLabel, Input } from "@mui/material";
import "../CSS/EditProfile.css";
import axios from "axios";

const EditProfile = () => {
  const { user, isLightMode, setUserFunction } = useContext(AuthContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");
  const [email, setEmail] = useState(user ? user.email : "");

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);
  const handleSubmit = async () => {
    try {
      const resp = await axios.put(
        "http://boskowindows-001-site1.anytempurl.com/api/User",
        {
          id: user.id,
          firstName: firstName,
          lastName: lastName,
          email: email,
        }
      );
      setUserFunction(resp.data);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
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
                    ? { color: "#427d9d", fontSize: "1.5rem" }
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
                    ? { color: "#427d9d", fontSize: "1.5rem" }
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
                  ? { color: "#427d9d", fontSize: "1.5rem" }
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
