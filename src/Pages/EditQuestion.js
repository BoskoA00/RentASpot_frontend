import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/Edit_question.css";
import { Button, FormLabel, Input } from "@mui/material";
import { Textarea } from "@mui/joy";
import axios from "axios";
const EditQuestion = () => {
  const { user, isLightMode } = useContext(AuthContext);
  const navigate = useNavigate();
  const { Qid } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    PokupiPitanje();
  }, []);
  const PokupiPitanje = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `api/Question/${Qid}`
      );
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      await axios.put(process.env.REACT_APP_API_URL + `api/Question/${Qid}`, {
        title: title,
        content: content,
      });
      navigate("/forum");
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  return (
    <div
      className="editQuestion-main"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      <div
        className="editQuestion-form"
        style={isLightMode ? {} : { backgroundColor: "black" }}
      >
        <div className="question-title-eq">
          <div className="question-title-label">
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
          <div className="question-title-input">
            <Input
              variant="soft"
              className="question-title-input"
              type="text"
              value={title}
              sx={
                isLightMode
                  ? {
                      width: "100%",
                      fontSize: "1.5rem",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      padding: "0.2em",
                      "& input": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    }
                  : {
                      width: "100%",
                      fontSize: "1.5rem",
                      backgroundColor: "black",
                      borderRadius: "10px",
                      padding: "0.2em",
                      "& input": {
                        backgroundColor: "#202020",
                        color: "#ddf2fd",
                      },
                    }
              }
              fullWidth
              onChange={handleTitle}
            />
          </div>
        </div>
        <div className="question-textarea">
          <div className="question-textarea-label">
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
          <div className="question-textarea-input">
            <Textarea
              sx={
                isLightMode
                  ? {
                      height: "80%",
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "10px",
                      padding: "0.2em",
                    }
                  : {
                      height: "80%",
                      backgroundColor: "#202020",
                      color: "white",
                      borderRadius: "10px",
                      padding: "0.2em",
                    }
              }
              size="lg"
              onChange={handleContent}
              defaultValue={content}
            />
          </div>
        </div>
        <div className="question-button">
          <Button
            sx={
              isLightMode
                ? {
                    width: "90%",
                    alignSelf: "center",
                    backgroundColor: "#427d9d",
                  }
                : {
                    width: "90%",
                    alignSelf: "center",
                    backgroundColor: "#202020",
                  }
            }
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            Potvrdi
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EditQuestion;
