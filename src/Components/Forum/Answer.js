import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Answer.css";
import OpcijeOdgovora from "./MenuAnswer";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
const Answer = (props) => {
  const { user, isLightMode } = useContext(AuthContext);
  const [korisnik, setKorisnik] = useState({});
  useEffect(() => {
    PokupiKorisnika();
  }, []);
  const PokupiKorisnika = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `api/User/${props.userId}`
      );
      setKorisnik(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="answer-main"
      style={isLightMode ? {} : { border: "1px solid white" }}
    >
      <div
        className="answer-user"
        style={isLightMode ? {} : { borderBottom: "1px solid white" }}
      >
        {korisnik && (
          <div className="answer-user-name">
            <Link
              style={isLightMode ? {} : { color: "white" }}
              to={`/user/${props.userId}`}
            >
              {korisnik.firstName + " " + korisnik.lastName}
            </Link>
          </div>
        )}
        {user && (user.role === 2 || user.id === props.userId) && (
          <div className="answer-user-options">
            <OpcijeOdgovora id={props.id} />
          </div>
        )}
      </div>
      <div
        className="answer-content"
        style={isLightMode ? {} : { color: "white" }}
      >
        {props.content}
      </div>
    </div>
  );
};
export default Answer;
