import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Profil_oglas.css";
import { AuthContext } from "../../Context/AuthContext";
const Oglas = (props) => {
  const { isLightMode } = useContext(AuthContext);
  return (
    <div
      className="profil-oglas"
      style={isLightMode ? {} : { border: "2px solid white" }}
    >
      <div
        className="profil-oglas-slika"
        style={isLightMode ? {} : { backgroundColor: "#202020" }}
      >
        <img
          src={`http://boskowindows-001-site1.anytempurl.com/Oglasi/${props.picturePath}`}
          alt={props.picturePath}
        />
      </div>
      <div
        className="profil-oglas-info"
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
          className="profil-oglas-info-ime"
        >
          <Link className="link" to={`/Oglas/${props.id}`}>
            <h1>{props.ime}</h1>
          </Link>
        </div>
        <div
          className="profil-oglas-info-grad-drzava"
          style={isLightMode ? {} : { color: "color" }}
        >
          {props.grad + "," + props.drzava}
        </div>
        <div
          className="profil-oglas-info-velicina"
          style={isLightMode ? {} : { color: "color" }}
        >
          {props.velicina} m^2
        </div>
        <div
          className="profil-oglas-info-cena"
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
          {props.cena} e
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
            className="profil-oglas-info-cena"
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
            className="profil-oglas-info-cena"
          >
            Prodaja
          </div>
        )}
      </div>
    </div>
  );
};

export default Oglas;
