import React, { useContext, useEffect, useState } from "react";
import Oglas from "../Components/Profil/Oglas";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import "../CSS/DiffProfile.css";
import { AuthContext } from "../Context/AuthContext";
const DiffProfil = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { isLightMode } = useContext(AuthContext);
  useEffect(() => {
    PokupiKorisnika();
  }, []);
  const PokupiKorisnika = async () => {
    try {
      const response = await axios.get(
        `http://boskowindows-001-site1.anytempurl.com/api/User/${id}`
      );
      setUser(response.data);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  return (
    user && (
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
              src={`http://boskowindows-001-site1.anytempurl.com/Images/${user.imageName}`}
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
          </div>{" "}
        </div>
        {user && user.role == 1 && (
          <div
            className="profil-main-2"
            style={
              isLightMode
                ? {}
                : { backgroundColor: "black", border: "3px solid black" }
            }
          >
            <div className="oglasi-korisnika-naslov">
              <h2>Oglasi korisnika</h2>
            </div>
            <div className="profil-oglasi">
              {user.oglasi.length === 0 ? (
                <div>Ovaj korisnik nema oglase koje je postavio</div>
              ) : (
                user.oglasi.map((oglas) => {
                  return (
                    <Oglas
                      key={oglas.id}
                      id={oglas.id}
                      ime={oglas.title}
                      grad={oglas.country}
                      drzava={oglas.city}
                      velicina={oglas.size}
                      cena={oglas.price}
                      tip={oglas.type}
                      picturePath={oglas.picturePath}
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
