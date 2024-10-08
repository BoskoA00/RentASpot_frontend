import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Question from "../Components/Forum/Question";
import axios from "axios";
import "../CSS/Forum.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Forum = () => {
  const { isLightMode, user } = useContext(AuthContext);
  const [Questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuestions();
  }, []);
  const getQuestions = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "api/Question"
      );
      setQuestions(response.data);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  return (
    <div
      className="forum-main"
      style={isLightMode ? {} : { backgroundColor: "#202020", color: "white" }}
    >
      {user && (
        <div className="create-button">
          <Link to="/createQuestion">
            <Button
              variant="contained"
              sx={
                isLightMode
                  ? { backgroundColor: "#427d9d" }
                  : {
                      backgroundColor: "black",
                      ":hover": { backgroundColor: "#202020" },
                    }
              }
            >
              Dodaj pitanje
            </Button>
          </Link>
        </div>
      )}
      {Questions.map((question) => {
        return (
          <Question
            key={question.id}
            id={question.id}
            user={question.user}
            title={question.title}
            content={question.content}
            answers={question.answers}
            userId={question.userId}
            imageName={question.user.imageName}
            getQuestions={getQuestions}
          />
        );
      })}
    </div>
  );
};
export default Forum;
