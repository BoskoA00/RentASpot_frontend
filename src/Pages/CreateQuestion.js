import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../CSS/Create_question.css";
import { Input, FormLabel, Textarea } from "@mui/joy";
import { Button } from "@mui/material";
import axios from "axios";
const CreateQuestion = () => {
  const { user, isLightMode } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleSubimt = async () => {
    if (title.trim().length === 0) {
      setTitleError("Pitanje mora imati naslov");
      return;
    } else {
      setTitleError("");
    }
    if (content.trim().length === 0) {
      setContentError("Morate imati sadrzaj");
      return;
    } else {
      setContentError("");
    }

    try {
      await axios.post(process.env.REACT_APP_API_URL + "api/Question", {
        title: title,
        content: content,
        userId: user.id,
      });
      navigate("/forum");
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  return (
    <div
      className="createQuestion-main"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      <div
        className="question-form"
        style={
          isLightMode
            ? {}
            : { border: "3px solid white", backgroundColor: "black" }
        }
      >
        <div className="question-title-cq">
          <div>
            <FormLabel
              sx={
                isLightMode
                  ? { fontSize: "1.5rem", color: "#427d9d" }
                  : { fontSize: "1.5rem", color: "white" }
              }
            >
              Naslov pitanja:
            </FormLabel>
          </div>
          <div>
            <div>
              <Input
                variant="soft"
                sx={
                  isLightMode
                    ? {
                        backgroundColor: "white",
                        color: "black",
                        fontSize: "1.5rem ",
                      }
                    : {
                        backgroundColor: "#202020",
                        color: "white",
                        fontSize: "1.5rem ",
                      }
                }
                type="text"
                onChange={handleTitle}
              />
            </div>
            <div style={isLightMode ? { color: "red" } : { color: "white" }}>
              {titleError}
            </div>
          </div>
        </div>
        <div className="question-text">
          <div>
            <FormLabel
              sx={
                isLightMode
                  ? { fontSize: "1.5rem", color: "#427d9d" }
                  : { fontSize: "1.5rem", color: "white" }
              }
            >
              Sadrzaj pitanja:
            </FormLabel>
          </div>
          <div className="question-textarea">
            <div>
              <Textarea
                sx={
                  isLightMode
                    ? {
                        height: "80%",
                        backgroundColor: "white",
                        color: "black",
                        fontSize: "1rem",
                      }
                    : {
                        height: "80%",
                        backgroundColor: "#202020",
                        color: "white",
                        fontSize: "1rem",
                      }
                }
                size="lg"
                onChange={handleContent}
              />
            </div>
            <div style={isLightMode ? { color: "red" } : { color: "white" }}>
              {contentError}
            </div>
          </div>
        </div>
        <div className="question-button">
          <Button
            onClick={handleSubimt}
            sx={
              isLightMode
                ? { backgroundColor: "#427d9d" }
                : { backgroundColor: "#202020" }
            }
            variant="contained"
            fullWidth
          >
            Dodaj pitanje
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateQuestion;
