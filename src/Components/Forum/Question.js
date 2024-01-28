import React, { useContext } from "react";
import Answer from "./Answer";
import { Link } from "react-router-dom";
import "../../CSS/Question.css";
import Opcije from "./Menu.js";
import { AuthContext } from "../../Context/AuthContext.js";
const Question = (props) => {
  const currentHref = window.location.href;
  const modifiedUrl = currentHref.replace("/forum", "");
  const finalUrl = modifiedUrl + `/user/${props.user.id}`;
  const { isLightMode, user } = useContext(AuthContext);

  return (
    <div
      className="question-main"
      style={isLightMode ? {} : { border: "3px solid white" }}
    >
      <div
        className="question-main-1"
        style={isLightMode ? {} : { borderBottom: "1px solid white" }}
      >
        <div className="user_info">
          <div className="question-user-image">
            <img
              src={`http://boskowindows-001-site1.anytempurl.com/Images/${props.user.imageName}`}
              alt={props.user.imageName}
            />
          </div>
          <div className="question-user-name">
            <Link style={isLightMode ? {} : { color: "white" }} to={finalUrl}>
              <h3>{props.user.firstName + " " + props.user.lastName}</h3>
            </Link>
          </div>
        </div>
        <div className="options">
          {user && (
            <div>
              <Opcije id={props.id} userId={props.userId} />
            </div>
          )}
        </div>
      </div>
      <div className="question-main-2">
        <div
          className="question-title"
          style={
            isLightMode
              ? {}
              : { color: "white", borderBottom: "1px solid white" }
          }
        >
          <h3>{props.title}</h3>
        </div>
        <div
          className="question-content"
          style={
            isLightMode
              ? {}
              : { color: "white", borderBottom: "1px solid white" }
          }
        >
          <h3>{props.content}</h3>
        </div>
      </div>
      <div className="question-answers">
        {props.answers.map((answer) => {
          return (
            <Answer
              key={answer.id}
              id={answer.id}
              user={answer.user}
              content={answer.content}
              userId={answer.userId}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Question;
