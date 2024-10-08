import React, { useContext, useEffect } from "react";
import Ad from "../Components/Profil/Ad";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Axios from "axios";
import "../CSS/Main_profil.css";
const Profil = () => {
  const { isLightMode, user, setUserFunction, setUserOglasi } =
    useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [navigate, user]);

  const getNewAds = async () => {
    try {
      const response = await Axios.get(
        process.env.REACT_APP_API_URL + `api/AdsByUser/${user.id}`
      );
      const noviOglasi = response.data;
      setUserOglasi(noviOglasi);
    } catch (e) {
      console.log("Error: " + e);
    }
  };
  useEffect(() => {
    getNewAds();
  }, []);
  const HandleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await Axios.delete(
        process.env.REACT_APP_API_URL + `api/User/${user.id}`,
        { headers }
      );

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUserFunction(null);
      navigate("/home");
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  return (
    <div
      className="profil-main-m"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      <div
        className="profil-main-1-m"
        style={
          isLightMode
            ? {}
            : { backgroundColor: "black", border: "3px solid black" }
        }
      >
        <div className="podaci-m">
          <div className="profil-data-image-m">
            <img
              src={process.env.REACT_APP_API_URL + `Images/${user.imageName}`}
              alt={user.imageName}
            />
          </div>
          <div className="profil-data-info">
            <div>
              <h3>{user.firstName + " " + user.lastName}</h3>
            </div>
            <div>
              <h3>{user.email}</h3>
            </div>
            <div>
              {user.role === 0 ? (
                <div>
                  <h3>Kupac</h3>
                </div>
              ) : (
                ""
              )}
              {user.role === 1 ? (
                <div>
                  <h3>Prodavac</h3>
                </div>
              ) : (
                ""
              )}
              {user.role === 2 ? (
                <div>
                  <h3>Administrator</h3>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="profil-dugmad-m">
          {user.role === 1 && (
            <div>
              <Link to={"/createOglas"}>
                <Button
                  variant="contained"
                  sx={
                    isLightMode
                      ? {
                          backgroundColor: "#427d9d",
                          ":hover": {
                            backgroundColor: "#ddf2fd",
                            color: "#427d9d",
                          },
                        }
                      : {
                          backgroundColor: "#202020",
                        }
                  }
                >
                  Kreiraj oglas
                </Button>
              </Link>
            </div>
          )}
          <div>
            <Link to={`${user.id}/editProfile`}>
              <Button
                variant="contained"
                sx={
                  isLightMode
                    ? { ":hover": { backgroundColor: "white", color: "blue" } }
                    : { backgroundColor: "#202020" }
                }
              >
                Izmeni podatke
              </Button>
            </Link>
          </div>
          <div>
            <Button
              onClick={HandleDelete}
              variant="contained"
              sx={{
                backgroundColor: "red",
                ":hover": { backgroundColor: "white", color: "red" },
              }}
            >
              Obrisi profil
            </Button>
          </div>
        </div>
      </div>
      {user.role === 1 && (
        <div
          className="profil-main-2-m"
          style={
            isLightMode
              ? {}
              : { backgroundColor: "black", border: "3px solid black" }
          }
        >
          <div
            className="oglasi-korisnika-naslov"
            style={isLightMode ? {} : { color: "white" }}
          >
            <h2>Oglasi korisnika</h2>
          </div>
          <div
            className="profil-oglasi-m"
            style={isLightMode ? {} : { border: "3px solid white" }}
          >
            {user.ads && user.ads.length > 0 ? (
              user.ads.map((oglas) => {
                return (
                  <Ad
                    key={oglas.id}
                    id={oglas.id}
                    ime={oglas.title}
                    grad={oglas.country}
                    drzava={oglas.city}
                    velicina={oglas.size}
                    cena={oglas.price}
                    type={oglas.type}
                    picturePath={oglas.picturePath}
                  />
                );
              })
            ) : (
              <div>Ovaj korisnik nema oglase koje je postavio</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Profil;
