import React, { useContext, useEffect, useState } from "react";
import Oglas from "../Components/Profil/Oglas";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/DiffProfile.css";
import { AuthContext } from "../Context/AuthContext";
import { Button } from "@mui/material";
const DiffProfil = () => {
  const { id } = useParams();
  const [Korisnik, setKorisnik] = useState(null);
  const { isLightMode, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    PokupiKorisnika();
  }, []);
  const PokupiKorisnika = async () => {
    try {
      const response = await axios.get(
        `http://boskowindows-001-site1.anytempurl.com/api/User/${id}`
      );
      setKorisnik(response.data);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  const HandleDelete = async () => {
    try {
      await axios.delete(
        `http://boskowindows-001-site1.anytempurl.com/api/User/${id}`
      );

      navigate("/home");
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  return (
    Korisnik && (
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
              src={`http://boskowindows-001-site1.anytempurl.com/Images/${Korisnik.imageName}`}
              alt={Korisnik.imageName}
            />
          </div>
          <div className="profil-data-info">
            <div>
              <h3>{Korisnik.firstName + " " + Korisnik.lastName}</h3>
            </div>
            <div>
              <h3>{Korisnik.email}</h3>
            </div>
            <div>
              {Korisnik.role === 0 ? (
                <div>
                  <h3>Kupac</h3>
                </div>
              ) : (
                ""
              )}
              {Korisnik.role === 1 ? (
                <div>
                  <h3>Prodavac</h3>
                </div>
              ) : (
                ""
              )}
              {Korisnik.role === 2 ? (
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
          <div className="profil-dugmad-dp">
            <div>
              <Link to={`/profil/${Korisnik.id}/editProfile`}>
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

        {Korisnik && Korisnik.role == 1 && (
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
              {Korisnik.oglasi.length === 0 ? (
                <div>Ovaj korisnik nema oglase koje je postavio</div>
              ) : (
                Korisnik.oglasi.map((oglas) => {
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
