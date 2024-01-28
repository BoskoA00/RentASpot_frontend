import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Axios from "axios";
import "../CSS/Oglas_page.css";
const Oglas = () => {
  const { user, setUserFunction } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [oglas, setOglas] = useState({});
  useEffect(() => {
    PokupiOgas();
  }, []);
  useEffect(() => {
    setTitle(oglas.title || "");
    setCity(oglas.city || "");
    setCountry(oglas.country || "");
    setSize(oglas.size || "");
    setPrice(oglas.price || "");
    setType(oglas.type || "");
  }, [oglas]);
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

  const onSubmitHandle = async (e) => {
    try {
      const response = await Axios.put(
        `http://boskowindows-001-site1.anytempurl.com/api/Oglas/${id}`,
        {
          title: Title,
          city: City,
          country: Country,
          size: Size,
          price: Price,
          type: Type,
        }
      );
      navigate("/home");
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const [Title, setTitle] = useState(oglas.title);
  const [City, setCity] = useState(oglas.city);
  const [Country, setCountry] = useState(oglas.country);
  const [Size, setSize] = useState(oglas.size);
  const [Price, setPrice] = useState(oglas.price);
  const [Type, setType] = useState(oglas.type);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const cityHandle = (e) => {
    setCity(e.target.value);
  };
  const countryHandle = (e) => {
    setCountry(e.target.value);
  };
  const priceHandle = (e) => {
    setPrice(e.target.value);
  };
  const sizeHandle = (e) => {
    setSize(e.target.value);
  };
  const typeHandle = (e) => {
    setType(e.target.value);
  };
  const deleteOglas = async () => {
    try {
      await Axios.delete(
        `http://boskowindows-001-site1.anytempurl.com/api/Oglas/${id}`
      );
      navigate("/home");
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  return (
    <div className="oglas-page-main">
      <div className="oglas-page-form">
        <div className="oglas-page-title">
          <div className="oglas-page-title-label">
            <label>Naslov:</label>
          </div>
          <div className="oglas-page-title-input">
            <input
              type="text"
              onChange={titleHandler}
              defaultValue={oglas.title}
            />
          </div>
        </div>
        <div className="oglas-page-cityCountry">
          <div className="oglas-page-cc-1">
            <div>
              <label>Grad</label>
            </div>
            <div>
              <input
                type="text"
                onChange={cityHandle}
                defaultValue={oglas.city}
              />
            </div>
          </div>
          <div className="oglas-page-cc-2">
            <div>
              <label>Zemlja</label>
            </div>
            <div>
              <input
                type="text"
                onChange={countryHandle}
                defaultValue={oglas.country}
              />
            </div>
          </div>
        </div>
        <div className="oglas-page-priceSize">
          <div className="oglas-page-ps-1">
            <div>
              <label>Cena:</label>
            </div>
            <div>
              <input
                type="number"
                onChange={priceHandle}
                defaultValue={oglas.price}
              />
            </div>
          </div>
          <div className="oglas-page-ps-2">
            <div>
              <label>Velicina:</label>
            </div>
            <div>
              <input
                type="number"
                onChange={sizeHandle}
                defaultValue={oglas.size}
              />
            </div>
          </div>
        </div>
        <div className="oglas-page-type">
          <div className="oglas-page-type-label">
            <label>Tip oglasa:</label>
          </div>
          <div className="oglas-page-type-input">
            <select onChange={typeHandle} defaultValue={oglas.type}>
              <option value={0}>Prodaja</option>
              <option value={1}>Iznajmljivanje</option>
            </select>
          </div>
        </div>
        <div className="oglas-page-button">
          <Button
            fullWidth
            variant="contained"
            sx={{ marginBottom: "0.5em" }}
            onClick={onSubmitHandle}
          >
            Promeni oglas
          </Button>
        </div>
        {user && (user.id === oglas.userId || user.Role === 2) && (
          <div className="oglas-page-button">
            <Button
              fullWidth
              variant="contained"
              sx={{
                background: "red",
                ":hover": { backgroundColor: "white", color: "red" },
              }}
              onClick={deleteOglas}
            >
              Izbrisi oglas
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Oglas;
