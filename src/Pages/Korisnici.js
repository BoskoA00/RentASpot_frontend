import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Korisnik from "../Components/Korisnici/Korisnik.js";
import "../CSS/Korisnici.css";
const Korisnici = () => {
  const { isLightMode, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [korisnici, setKorisnici] = useState({});
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    PokupiKorisnike();
  }, []);
  function PokupiKorisnikeF() {
    try {
      PokupiKorisnike();
    } catch (e) {}
  }
  const PokupiKorisnike = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "api/User"
      );
      setKorisnici(response.data);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  return (
    <div
      className="korisnici-main"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      {korisnici.length > 0 ? (
        korisnici.map((korisnik) => {
          if (user.id !== korisnik.id)
            return (
              <Korisnik
                key={korisnik.id}
                id={korisnik.id}
                firstName={korisnik.firstName}
                lastName={korisnik.lastName}
                email={korisnik.email}
                imageName={korisnik.imageName}
                role={korisnik.role}
                function={PokupiKorisnikeF}
              />
            );
        })
      ) : (
        <div>Nema drugih korisnika aplikacije</div>
      )}
    </div>
  );
};
export default Korisnici;
