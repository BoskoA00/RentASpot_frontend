import React, { useContext, useState } from "react";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import "../../CSS/Search.css";
import { AuthContext } from "../../Context/AuthContext";

const Pretraga = ({ onSearch }) => {
  const { isLightMode } = useContext(AuthContext);
  const [grad, setGrad] = useState("");
  const [drzava, setDrzava] = useState("");
  const [velicina, setVelicina] = useState(0);
  const [maxCena, setMaxCena] = useState(0);
  const [minCena, setMinCena] = useState(0);

  const handleSearchClick = () => {
    const searchParams = {
      grad,
      drzava,
      velicina,
      maxCena,
      minCena,
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
            onChange={(e) => setDrzava(e.target.value)}
            value={drzava}
          />
        </div>
      </div>
      <div className="search-params-div">
        <div className="search-params-div-label">Grad:</div>
        <div className="search-params-div-input">
          <input
            name="Grad"
            onChange={(e) => setGrad(e.target.value)}
            value={grad}
          />
        </div>
      </div>
      <div className="search-params-div">
        <div className="search-params-div-label">Maks.velicina(m^2):</div>
        <div className="search-params-div-input">
          <Slider
            name="Velicina"
            size="small"
            value={velicina}
            onChange={(e, newValue) => setVelicina(newValue)}
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
            name="MaxCena"
            size="small"
            value={maxCena}
            onChange={(e, newValue) => setMaxCena(newValue)}
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
            name="MinCena"
            size="small"
            value={minCena}
            onChange={(e, newValue) => setMinCena(newValue)}
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

export default Pretraga;
