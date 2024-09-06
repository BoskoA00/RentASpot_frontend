import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Profile_ad.css";
import { AuthContext } from "../../Context/AuthContext";
const Ad = (props) => {
  const { isLightMode } = useContext(AuthContext);
  return (
    <div
      className="profil-ad"
      style={isLightMode ? {} : { border: "2px solid white" }}
    >
      <div
        className="profil-ad-image"
        style={isLightMode ? {} : { backgroundColor: "#202020" }}
      >
        <img
          src={process.env.REACT_APP_API_URL + `Ads/${props.picturePath}`}
          alt={props.picturePath}
        />
      </div>
      <div
        className="profil-ad-info"
        style={isLightMode ? {} : { backgroundColor: "#202020" }}
      >
        <div
          style={
            isLightMode
              ? {}
              : {
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid #202020",
                }
          }
          className="profil-ad-info-name"
        >
          <Link className="link" to={`/Oglas/${props.id}`}>
            <h1>{props.name}</h1>
          </Link>
        </div>
        <div
          className="profil-ad-info-city-country"
          style={isLightMode ? {} : { color: "color" }}
        >
          {props.city + "," + props.country}
        </div>
        <div
          className="profil-ad-info-size"
          style={isLightMode ? {} : { color: "color" }}
        >
          {props.size} m^2
        </div>
        <div
          className="profil-ad-info-price"
          style={
            isLightMode
              ? {}
              : {
                  color: "color",
                  backgroundColor: "black",
                  border: "1px solid black",
                }
          }
        >
          {props.price} e
        </div>
        {props.type === 0 ? (
          <div
            style={
              isLightMode
                ? {}
                : {
                    color: "color",
                    backgroundColor: "black",
                    border: "1px solid black",
                  }
            }
            className="profil-ad-info-price"
          >
            Izdavanje
          </div>
        ) : (
          <div
            style={
              isLightMode
                ? {}
                : {
                    color: "color",
                    backgroundColor: "black",
                    border: "1px solid black",
                  }
            }
            className="profil-ad-info-price"
          >
            Prodaja
          </div>
        )}
      </div>
    </div>
  );
};

export default Ad;
