import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Home_page_oglas.css";
import { AuthContext } from "../../Context/AuthContext.js";
const Oglas = (props) => {
  const { isLightMode } = useContext(AuthContext);
  return (
    <div
      className="oglas"
      style={isLightMode ? {} : { border: "3px solid white" }}
    >
      <div className="oglas-slika">
        <img
          src={`http://boskowindows-001-site1.anytempurl.com/Oglasi/${props.picturePath}`}
          alt={`${props.picturePath}`}
        />
      </div>
      <div className="oglas-info">
        <div
          className="oglas-info-ime"
          style={
            isLightMode
              ? {}
              : { backgroundColor: "black", border: "1px solid black" }
          }
        >
          <Link to={`/Oglas/${props.id}`}>
            <h1>{props.ime}</h1>
          </Link>
        </div>
        <div className="oglas-info-grad-drzava">
          {props.grad + "," + props.drzava}
        </div>
        <div className="oglas-info-velicina">{props.velicina} m^2</div>
        <div
          className="profil-oglas-info-cena"
          style={
            isLightMode
              ? {}
              : { backgroundColor: "black", border: "1px solid black" }
          }
        >
          {props.cena} e
        </div>
        {props.type === 0 ? (
          <div
            style={
              isLightMode
                ? {}
                : { backgroundColor: "black", border: "1px solid black" }
            }
            className="profil-oglas-info-cena"
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
            className="profil-oglas-info-cena"
          >
            Izdavanje
          </div>
        )}
      </div>
    </div>
  );
};

export default Oglas;
