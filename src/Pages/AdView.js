import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Axios from "axios";
import "../CSS/Ad_view.css";
const AdView = () => {
  const { user, isLightMode } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState({});

  useEffect(() => {
    getAd();
  }, []);
  const getAd = async () => {
    try {
      const response = await Axios.get(
        process.env.REACT_APP_API_URL + `api/Ad/${id}`
      );
      setAd(response.data);
    } catch (e) {
      console.log("Error:" + e);
    }
  };

  const handleDelete = async () => {
    try {
      await Axios.delete(process.env.REACT_APP_API_URL + `api/Ad/${ad.id}`);
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
          <img src={process.env.REACT_APP_API_URL + `Ads/${ad.picturePath}`} />
        </div>
        <div className="oglasView-page-form-2">
          <div
            className="oglasView-title"
            style={
              isLightMode ? {} : { color: "white", backgroundColor: "#202020" }
            }
          >
            <h2>{ad.title}</h2>
          </div>
          <div
            className="oglasView-cc"
            style={isLightMode ? {} : { color: "white" }}
          >
            <h3>Lokacija: {ad.city + "," + ad.country}</h3>
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
              <h3>Cena : {ad.price + " e"}</h3>
            </div>
            <div
              className="oglasView-size"
              style={
                isLightMode
                  ? {}
                  : { color: "white", backgroundColor: "#202020" }
              }
            >
              <h3>Velicina : {ad.size + " m^2"}</h3>
            </div>
          </div>
          <div className="oglasView-user">
            {ad.user && (
              <Link
                style={isLightMode ? {} : { color: "white" }}
                className="link"
                to={`/user/${ad.user.id}`}
              >
                {ad.user.firstName + " " + ad.user.lastName}
              </Link>
            )}
          </div>
        </div>
      </div>
      {user && (user.id === ad.userId || user.role === 2) && (
        <div className="oglasView-buttons">
          <div className="oglasView-editB">
            <Link to={`/Oglas/${ad.id}/edit`}>
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
                Izmeni ad
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
              Izbrisi ad
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdView;
