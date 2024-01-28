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
    if (onSearch) {
      onSearch(searchParams);
    }
  };
  const PromenaGrada = (e) => {
    setGrad(e.target.value);
  };
  const PromenaDrzave = (e) => {
    setDrzava(e.target.value);
  };
  const PromenaVelicine = (e) => {
    setVelicina(e.target.value);
  };
  const PromenaMaxCene = (e) => {
    setMaxCena(e.target.value);
  };
  const PromenaMinCene = (e) => {
    setMinCena(e.target.value);
  };
  const handleReset = () => {
    setGrad("");
    setDrzava("");
    setVelicina(0);
    setMaxCena(0);
    setMinCena(0);
    document.getElementsByName("Drzava")[0].value = "";
    document.getElementById("Grad").value = "";
    document.getElementsByName("Velicina")[0].value = 0;
    document.getElementsByName("MaxCena")[0].value = 0;
    document.getElementsByName("MinCena")[0].value = 0;

    if (onSearch) {
      onSearch({});
    }
  };
  return (
    <div
      className="search-params"
      style={isLightMode ? {} : { backgroundColor: "black", color: "white" }}
    >
      <div className="search-params-div">
        <div className="search-params-div-label">Drzava:</div>
        <div className="search-params-div-input">
          <input name="Drzava" onChange={PromenaDrzave} defaultValue={drzava} />
        </div>
      </div>
      <div className="search-params-div">
        <div className="search-params-div-label">Grad:</div>
        <div className="search-params-div-input">
          <input
            id="Grad"
            onChange={PromenaGrada}
            defaultValue={grad}
            name="Grad"
          />
        </div>
      </div>
      <div className="search-params-div">
        <div className="search-params-div-label">Maks.velicina(m^2):</div>
        <div className="search-params-div-input">
          <Slider
            sx={{ color: "white" }}
            name="Velicina"
            size="small"
            onChange={PromenaVelicine}
            min={0}
            max={1000}
            defaultValue={velicina}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </div>
      </div>
      <div className="search-params-div">
        <div className="search-params-div-label">Mask.cena:</div>
        <div className="search-params-div-input">
          <Slider
            name="MaxCena"
            sx={{ color: "white" }}
            onChange={PromenaMaxCene}
            size="small"
            defaultValue={maxCena}
            min={0}
            aria-label="Small"
            valueLabelDisplay="auto"
            max={3000000}
          />
        </div>
      </div>
      <div className="search-params-div">
        <div className="search-params-div-label">Min.cena:</div>
        <div className="search-params-div-input">
          <Slider
            sx={{ color: "white" }}
            name="MinCena"
            size="small"
            defaultValue={minCena}
            onChange={PromenaMinCene}
            min={0}
            max={5000}
            aria-label="Small"
            valueLabelDisplay="auto"
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
      <div className="search-params-div-button">
        <Button
          onClick={handleReset}
          sx={
            isLightMode
              ? { backgroundColor: "#427d9d" }
              : { backgroundColor: "gray" }
          }
          variant="contained"
          fullWidth
        >
          Resetuj pretragu
        </Button>
      </div>
    </div>
  );
};

export default Pretraga;
