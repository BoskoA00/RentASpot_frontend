import React, { useContext, useState } from "react";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import "../../CSS/Search.css";
import { AuthContext } from "../../Context/AuthContext";

const Search = ({ onSearch }) => {
  const { isLightMode } = useContext(AuthContext);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [size, setSize] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  const handleSearchClick = () => {
    const searchParams = {
      city,
      country,
      size,
      maxPrice,
      minPrice,
    };
    onSearch(searchParams);
  };

  return (
    <div
      className="search-params"
      style={isLightMode ? {} : { backgroundColor: "black", color: "white" }}
    >
      <div className="search-params-div">
        <div className="search-params-div-label">Drzava:</div>
        <div className="search-params-div-input">
          <input
            name="Drzava"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
        </div>
      </div>
      <div className="search-params-div">
        <div className="search-params-div-label">Grad:</div>
        <div className="search-params-div-input">
          <input
            name="Grad"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>
      </div>
      <div className="search-params-div">
        <div className="search-params-div-label">Maks.size(m^2):</div>
        <div className="search-params-div-input">
          <Slider
            name="Velicina"
            size="small"
            value={size}
            onChange={(e, newValue) => setSize(newValue)}
            min={0}
            max={1000}
            valueLabelDisplay="on"
          />
        </div>
      </div>
      <div className="search-params-div">
        <div className="search-params-div-label">Max.cena:</div>
        <div className="search-params-div-input">
          <Slider
            name="MaxPrice"
            size="small"
            value={maxPrice}
            onChange={(e, newValue) => setMaxPrice(newValue)}
            min={0}
            max={1000000}
            valueLabelDisplay="on"
          />
        </div>
      </div>
      <div className="search-params-div">
        <div className="search-params-div-label">Min.cena:</div>
        <div className="search-params-div-input">
          <Slider
            name="MinPrice"
            size="small"
            value={minPrice}
            onChange={(e, newValue) => setMinPrice(newValue)}
            min={0}
            max={10000}
            valueLabelDisplay="on"
          />
        </div>
      </div>
      <div className="search-params-div-button">
        <Button
          onClick={handleSearchClick}
          sx={
            isLightMode
              ? { backgroundColor: "#427d9d" }
              : { backgroundColor: "gray" }
          }
          variant="contained"
          fullWidth
        >
          Pretrazi
        </Button>
      </div>
    </div>
  );
};

export default Search;
