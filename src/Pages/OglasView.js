import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Axios from "axios";
import "../CSS/Oglas_view.css";
const OglasView = () => {
  const { user, isLightMode } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [oglas, setOglas] = useState({});

  useEffect(() => {
    PokupiOgas();
  }, []);

  const PokupiOgas = async () => {
    try {
      const response = await Axios.get(
        `http://boskowindows-001-site1.anytempurl.com/api/Oglas/${id}`
      );
      setOglas(response.data);
    } catch (e) {
      console.log("Error:" + e);
    }
  };

  const handleDelete = async () => {
    try {
      await Axios.delete(
        `http://boskowindows-001-site1.anytempurl.com/api/Oglas/${oglas.id}`
      );
      navigate("/home");
    } catch (e) {
      console.log("Error" + e);
    }
  };
  return (
    <div
      className="oglasView-page-main"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      <div
        className="oglasView-page-form"
        style={
          isLightMode
            ? {}
            : { backgroundColor: "black", border: "3px solid black" }
        }
      >
        <div className="oglasView-page-form-1">
          <img
            src={`http://boskowindows-001-site1.anytempurl.com/Oglasi/${oglas.picturePath}`}
          />
        </div>
        <div className="oglasView-page-form-2">
          <div
            className="oglasView-title"
            style={
              isLightMode ? {} : { color: "white", backgroundColor: "#202020" }
            }
          >
            <h2>{oglas.title}</h2>
          </div>
          <div
            className="oglasView-cc"
            style={isLightMode ? {} : { color: "white" }}
          >
            <h3>Lokacija: {oglas.city + "," + oglas.country}</h3>
          </div>
          <div className="oglasView-ps ">
            <div
              className="oglasView-price"
              style={
                isLightMode
                  ? {}
                  : { color: "white", backgroundColor: "#202020" }
              }
            >
              <h3>Cena : {oglas.price + " e"}</h3>
            </div>
            <div
              className="oglasView-size"
              style={
                isLightMode
                  ? {}
                  : { color: "white", backgroundColor: "#202020" }
              }
            >
              <h3>Velicina : {oglas.size + " m^2"}</h3>
            </div>
          </div>
          <div className="oglasView-user">
            {oglas.user && (
              <Link
                style={isLightMode ? {} : { color: "white" }}
                className="link"
                to={`/user/${oglas.user.id}`}
              >
                {oglas.user.firstName + " " + oglas.user.lastName}
              </Link>
            )}
          </div>
        </div>
      </div>
      {user && (user.id === oglas.userId || user.Role === 2) && (
        <div className="oglasView-buttons">
          <div className="oglasView-editB">
            <Link to={`/Oglas/${oglas.id}/edit`}>
              <Button
                sx={
                  isLightMode
                    ? {
                        backgroundColor: "#427d9d",
                      }
                    : { backgroundColor: "black" }
                }
                variant="contained"
                fullWidth
              >
                Izmeni oglas
              </Button>
            </Link>
          </div>
          <div className="oglasView-deleteB">
            <Button
              sx={{ ":hover": { backgroundColor: "white", color: "red" } }}
              variant="contained"
              fullWidth
              onClick={handleDelete}
            >
              Izbrisi oglas
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default OglasView;
