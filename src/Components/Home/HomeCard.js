import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Home_page_oglas.css";
import { AuthContext } from "../../Context/AuthContext.js";
const Oglas = (props) => {
  const { isLightMode } = useContext(AuthContext);
  return (
    <div
      className="ad"
      style={isLightMode ? {} : { border: "3px solid white" }}
    >
      <div className="ad-image">
        <img
          src={process.env.REACT_APP_API_URL + `Ads/${props.picturePath}`}
          alt={`${props.picturePath}`}
        />
      </div>
      <div className="ad-info">
        <div
          className="ad-info-name"
          style={
            isLightMode
              ? {}
              : { backgroundColor: "black", border: "1px solid black" }
          }
        >
          <Link to={`/Oglas/${props.id}`}>
            <h1>{props.name}</h1>
          </Link>
        </div>
        <div className="ad-info-city-country">
          {props.city + "," + props.country}
        </div>
        <div className="ad-info-size">{props.size} m^2</div>
        <div
          className="ad-info-price"
          style={
            isLightMode
              ? {}
              : { backgroundColor: "black", border: "1px solid black" }
          }
        >
          {props.price} e
        </div>
        {props.type === 0 ? (
          <div
            style={
              isLightMode
                ? {}
                : { backgroundColor: "black", border: "1px solid black" }
            }
            className="ad-info-price"
          >
            Prodaja
          </div>
        ) : (
          <div
            style={
              isLightMode
                ? {}
                : { backgroundColor: "black", border: "1px solid black" }
            }
            className="ad-info-price"
          >
            Izdavanje
          </div>
        )}
      </div>
    </div>
  );
};

export default Oglas;
