import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/Create_answer.css";
import { Button, FormLabel } from "@mui/material";
import { Input } from "@mui/joy";
import axios from "axios";
const CreateAnswer = () => {
  const { user, isLightMode } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);
  const handleText = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async () => {
    if (text.trim().length === 0) {
      setTextError("Morate imati tekst odgovora");
      return;
    } else {
      setTextError("");
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "api/Question/Answers",
        {
          content: text,
          questionId: id,
          userId: user.id,
        }
      );
      navigate("/forum");
    } catch (e) {
      console.log("Error" + e);
    }
  };
  return (
    <div
      className="createAnswer-main"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      <div
        className="createAnswer-form"
        style={
          isLightMode
            ? {}
            : { backgroundColor: "black", border: "3px solid white" }
        }
      >
        <div className="answer-data">
          <div>
            <FormLabel
              sx={
                isLightMode
                  ? { color: "#427d9d", fontSize: "1.5rem" }
                  : { color: "white", fontSize: "1.5rem" }
              }
            >
              Tekst odgovora:
            </FormLabel>
          </div>
          <div>
            <div>
              <Input
                sx={
                  isLightMode
                    ? {}
                    : { backgroundColor: "#202020", color: "white" }
                }
                variant="soft"
                type="text"
                onChange={handleText}
              />
            </div>
            <div style={isLightMode ? { color: "red" } : { color: "white" }}>
              {textError}
            </div>
          </div>
        </div>
        <div className="answer-button">
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={
              isLightMode
                ? { width: "40%", backgroundColor: "#427d9d" }
                : {
                    backgroundColor: "#202020",
                    ":hover": { backgroundColor: "white", color: "black" },
                  }
            }
          >
            Postavi odgovor
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateAnswer;
