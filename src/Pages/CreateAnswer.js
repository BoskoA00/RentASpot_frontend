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
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);
  const handleText = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://boskowindows-001-site1.anytempurl.com/api/Question/Answers",
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
