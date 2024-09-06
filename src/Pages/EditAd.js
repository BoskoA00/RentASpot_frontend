import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Axios from "axios";
import "../CSS/Ad_page.css";
const Ad = () => {
  const { user, isLightMode } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [idVlasnika, setVlasnikId] = useState(0);
  const [Title, setTitle] = useState("");
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [Size, setSize] = useState(0);
  const [Price, setPrice] = useState(0);
  const [Type, setType] = useState(0);

  useEffect(() => {
    getAd();
  }, []);
  useEffect(() => {
    setTitle("");
    setCity("");
    setCountry("");
    setSize(0);
    setPrice(0);
    setType(0);
  }, []);
  const getAd = async () => {
    try {
      const response = await Axios.get(
        process.env.REACT_APP_API_URL + `api/Ad/${id}`
      );
      setVlasnikId(response.data.id);
      setTitle(response.data.title);
      setCity(response.data.city);
      setCountry(response.data.country);
      setSize(response.data.size);
      setPrice(response.data.price);
      setType(response.data.type);
    } catch (e) {
      console.log("Error:" + e);
    }
  };

  const onSubmitHandle = async (e) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await Axios.put(
        process.env.REACT_APP_API_URL + `api/Ad/${id}`,
        {
          Title: Title,
          City: City,
          Country: Country,
          Size: Size,
          Price: Price,
          Type: Type,
        },
        { headers }
      );
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };

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
      await Axios.delete(process.env.REACT_APP_API_URL + `api/Ad/${id}`);
      navigate("/home");
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  return (
    <div
      className="oglas-page-main"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      <div
        className="oglas-page-form"
        style={isLightMode ? {} : { backgroundColor: "black", color: "white" }}
      >
        <div className="oglas-page-title">
          <div className="oglas-page-title-label">
            <label>Naslov:</label>
          </div>
          <div className="oglas-page-title-input">
            <input type="text" onChange={titleHandler} value={Title} />
          </div>
        </div>
        <div className="oglas-page-cityCountry">
          <div className="oglas-page-cc-1">
            <div>
              <label>Grad</label>
            </div>
            <div>
              <input type="text" onChange={cityHandle} value={City} />
            </div>
          </div>
          <div className="oglas-page-cc-2">
            <div>
              <label>Zemlja</label>
            </div>
            <div>
              <input type="text" onChange={countryHandle} value={Country} />
            </div>
          </div>
        </div>
        <div className="oglas-page-priceSize">
          <div className="oglas-page-ps-1">
            <div>
              <label>Cena:</label>
            </div>
            <div>
              <input type="number" onChange={priceHandle} value={Price} />
            </div>
          </div>
          <div className="oglas-page-ps-2">
            <div>
              <label>Velicina:</label>
            </div>
            <div>
              <input type="number" onChange={sizeHandle} value={Size} />
            </div>
          </div>
        </div>
        <div className="oglas-page-type">
          <div className="oglas-page-type-label">
            <label>Tip oglasa:</label>
          </div>
          <div className="oglas-page-type-input">
            <select onChange={typeHandle} value={Type}>
              <option value={0}>Prodaja</option>
              <option value={1}>Iznajmljivanje</option>
            </select>
          </div>
        </div>
        <div className="oglas-page-button">
          <Button
            fullWidth
            variant="contained"
            sx={
              isLightMode
                ? { marginBottom: "0.5em" }
                : { backgroundColor: "#202020" }
            }
            onClick={onSubmitHandle}
          >
            Promeni oglas
          </Button>
        </div>
        {user && (user.id === idVlasnika || user.Role === 2) && (
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
export default Ad;
