import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, FormControlLabel, Input, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import FormData from "form-data";
import Axios from "axios";
import "../CSS/Create_ad.css";
const CreateAd = () => {
  const { user, isLightMode } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [type, setType] = useState(0);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [ownerId, setOwnerId] = useState(user.id);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setOwnerId(user.id);
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("City", city);
    formData.append("Country", country);
    formData.append("Price", price);
    formData.append("Size", size);
    formData.append("Picture", file);
    formData.append("PicturePath", fileName);
    formData.append("Type", type);
    formData.append("UserId", ownerId);

    try {
      const token = localStorage.getItem("token");

      const response = await Axios.post(
        process.env.REACT_APP_API_URL + "api/Ad",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/home");
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const cityHandler = (e) => {
    setCity(e.target.value);
  };
  const countryHandler = (e) => {
    setCountry(e.target.value);
  };
  const priceHandler = (e) => {
    setPrice(e.target.value);
  };
  const sizeHandler = (e) => {
    setSize(e.target.value);
  };
  const typeHandler = (e) => {
    setType(e.target.value);
  };
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  return user != null ? (
    <div
      className="createOglas-main"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      <form
        onSubmit={onSubmitHandler}
        className="createOglas-form"
        style={
          isLightMode
            ? {}
            : {
                backgroundColor: "black",
                border: "3px solid  black ",
                color: "white",
              }
        }
      >
        <div className="createOglas-form-title">
          <div className="createOglas-form-title-1">
            <label>Naslov oglasa:</label>
          </div>
          <div>
            <input
              onChange={titleHandler}
              type="text"
              style={
                isLightMode
                  ? {}
                  : { backgroundColor: "#202020", color: "white" }
              }
            />
          </div>
        </div>
        <div className="createOglas-form-city">
          <div className="createOglas-form-city-1">
            <label>Grad:</label>
          </div>
          <div>
            <input type="text" onChange={cityHandler} value={city} />
          </div>
        </div>
        <div className="createOglas-form-country">
          <div className="createOglas-form-country-1">
            <label>Zemlja:</label>
          </div>
          <div>
            <input
              onChange={countryHandler}
              type="text"
              value={country}
              style={
                isLightMode
                  ? {}
                  : { backgroundColor: "#202020", color: "white" }
              }
            />
          </div>
        </div>
        <div className="createOglas-form-price">
          <div className="createOglas-form-price-1">
            <label>Cena:</label>
          </div>
          <div>
            <input
              onChange={priceHandler}
              type="number"
              style={
                isLightMode
                  ? {}
                  : { backgroundColor: "#202020", color: "white" }
              }
            />
          </div>
        </div>
        <div className="createOglas-form-size">
          <div className="createOglas-form-size-1">
            <label>Velicina:</label>
          </div>
          <div>
            <input
              onChange={sizeHandler}
              type="number"
              style={
                isLightMode
                  ? {}
                  : { backgroundColor: "#202020", color: "white" }
              }
            />
          </div>
        </div>
        <div className="createOglas-form-type">
          <div className="createOglas-form-type-1">
            <label>Tip:</label>
          </div>
          <div className="createOglas-form-type-radiogroup">
            <RadioGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
              onChange={typeHandler}
            >
              <FormControlLabel
                value="0"
                control={<Radio sx={isLightMode ? {} : { color: "white" }} />}
                label="Prodaja"
              />
              <FormControlLabel
                value="1"
                control={<Radio sx={isLightMode ? {} : { color: "white" }} />}
                label="Iznajmljivanje"
              />
            </RadioGroup>
          </div>
        </div>
        <div className="createOglas-form-file">
          <div className="createOglas-form-file-1">
            <label>Slika:</label>
          </div>
          <div className="createOglas-form-file-2">
            <input
              onChange={fileHandler}
              type="file"
              accept="image/jpeg,image/png"
              style={
                isLightMode
                  ? {}
                  : {
                      backgroundColor: "#202020",
                      color: "white",
                    }
              }
            />
          </div>
        </div>
        <div className="createOglas-form-button">
          <Button
            sx={
              isLightMode
                ? { ":hover": { backgroundColor: "#427d9d" } }
                : {
                    backgroundColor: "#202020",
                    ":hover": { backgroundColor: "white", color: "black" },
                  }
            }
            fullWidth
            onClick={onSubmitHandler}
            variant="contained"
          >
            Kreiraj oglas
          </Button>
        </div>
      </form>
    </div>
  ) : (
    ""
  );
};
export default CreateAd;
