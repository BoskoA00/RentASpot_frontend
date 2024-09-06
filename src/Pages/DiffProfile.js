import React, { useContext, useEffect, useState } from "react";
import Ad from "../Components/Profil/Ad";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/DiffProfile.css";
import { AuthContext } from "../Context/AuthContext";
import { Button } from "@mui/material";
const DiffProfil = () => {
  const { id } = useParams();
  const [User, setKorisnik] = useState(null);
  const { isLightMode, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    PokupiKorisnika();
  }, []);
  const PokupiKorisnika = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `api/User/${id}`
      );
      setKorisnik(response.data);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  const HandleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(process.env.REACT_APP_API_URL + `api/User/${id}`, {
        headers,
      });

      navigate("/home");
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  return (
    User && (
      <div
        className="profil-main"
        style={isLightMode ? {} : { backgroundColor: "#202020" }}
      >
        <div
          className="profil-main-1"
          style={
            isLightMode
              ? {}
              : { backgroundColor: "black", border: "3px solid black" }
          }
        >
          <div className="profil-data-image">
            <img
              src={process.env.REACT_APP_API_URL + `Images/${User.imageName}`}
              alt={User.imageName}
            />
          </div>
          <div className="profil-data-info">
            <div>
              <h3>{User.firstName + " " + User.lastName}</h3>
            </div>
            <div>
              <h3>{User.email}</h3>
            </div>
            <div>
              {User.role === 0 ? (
                <div>
                  <h3>Kupac</h3>
                </div>
              ) : (
                ""
              )}
              {User.role === 1 ? (
                <div>
                  <h3>Prodavac</h3>
                </div>
              ) : (
                ""
              )}
              {User.role === 2 ? (
                <div>
                  <h3>Administrator</h3>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>{" "}
        </div>
        {user && user.role === 2 && (
          <div className="profil-buttons-dp">
            <div>
              <Link to={`/profil/${User.id}/editProfile`}>
                <Button
                  variant="contained"
                  sx={
                    isLightMode
                      ? {
                          width: "90%",

                          ":hover": { backgroundColor: "white", color: "blue" },
                        }
                      : { backgroundColor: "#202020", width: "90%" }
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
                  width: "90%",
                  ":hover": { backgroundColor: "white", color: "red" },
                }}
              >
                Obrisi profil
              </Button>
            </div>
          </div>
        )}

        {User && User.role == 1 && (
          <div
            className="profil-main-2"
            style={
              isLightMode
                ? {}
                : { backgroundColor: "black", border: "3px solid black" }
            }
          >
            <div className="ads-user-naslov">
              <h2>Oglasi korisnika</h2>
            </div>
            <div className="profil-ads">
              {User && User.ads && User.ads.length === 0 ? (
                <div>Ovaj korisnik nema oglase koje je postavio</div>
              ) : (
                User.ads.map((ad) => {
                  return (
                    <Ad
                      key={ad.id}
                      id={ad.id}
                      name={ad.title}
                      country={ad.country}
                      city={ad.city}
                      size={ad.size}
                      price={ad.price}
                      type={ad.type}
                      picturePath={ad.picturePath}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    )
  );
};
export default DiffProfil;
