import React, { useContext, useEffect, useState } from "react";
import Pretraga from "../Components/Home/Search";
import Oglas from "../Components/Home/HomeCard";
import Axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import ".././CSS/Home.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Pocetna = ({ onSearchComplete }) => {
  const { isLightMode } = useContext(AuthContext);
  const [oglasi, setOglasi] = useState([]);
  const [filteredOglasi, setFilteredOglasi] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const PokupiOglase = async () => {
    try {
      const response = await Axios.get(
        "http://boskowindows-001-site1.anytempurl.com/api/Oglas"
      );
      setOglasi(response.data);
    } catch (e) {
      console.log("Error:" + e);
    }
  };

  useEffect(() => {
    PokupiOglase();
  }, [filteredOglasi]);
  const handleSearch = async (searchParams) => {
    const filteredResults = oglasi.filter((oglas) => {
      const matchesDrzava =
        !searchParams.drzava || oglas.country.includes(searchParams.drzava);
      const matchesGrad =
        !searchParams.grad || oglas.city.includes(searchParams.grad);
      const matchesVelicina =
        searchParams.velicina === 0 || oglas.size <= searchParams.velicina;
      const matchesMinCena =
        searchParams.minCena === 0 || oglas.price >= searchParams.minCena;
      const matchesMaxCena =
        searchParams.maxCena === 0 || oglas.price <= searchParams.maxCena;

      return (
        matchesDrzava &&
        matchesGrad &&
        matchesVelicina &&
        matchesMinCena &&
        matchesMaxCena
      );
    });
    if (filteredResults.length > 0) {
      setOglasi(filteredResults);
    } else {
      try {
        const response = await Axios.get(
          "http://boskowindows-001-site1.anytempurl.com/api/Oglas"
        );
        setOglasi(response.data);
      } catch (e) {
        console.log("Error:" + e);
      }
    }
    setCurrentPage(1);
  };
  const totalPages = Math.ceil(oglasi.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOglasi = oglasi.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div
      className="homepage-main"
      style={isLightMode ? {} : { backgroundColor: "#202020", color: "white" }}
    >
      <Pretraga onSearch={handleSearch} />
      <div
        className="homepage-oglasi"
        style={isLightMode ? {} : { border: "3px solid white" }}
      >
        <div className="oglasi">
          {currentOglasi.length === 0 ? (
            <div style={{ textAlign: "center" }}>Nema oglasa</div>
          ) : (
            ""
          )}
          {currentOglasi.map((oglas) => (
            <Oglas
              key={oglas.id}
              id={oglas.id}
              ime={oglas.title}
              grad={oglas.country}
              drzava={oglas.city}
              velicina={oglas.size}
              cena={oglas.price}
              type={oglas.type}
              picturePath={oglas.picturePath}
            />
          ))}
        </div>

        {currentOglasi.length !== 0 && (
          <div className="pagination-controls">
            <div className="pag-divs">
              <div>
                <button
                  style={
                    isLightMode
                      ? {}
                      : { backgroundColor: "black", color: "white" }
                  }
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ArrowBackIosIcon />
                </button>
              </div>
              <div className="span-div">
                <span>{currentPage}</span>
              </div>
              <div>
                <button
                  style={
                    isLightMode
                      ? {}
                      : { backgroundColor: "black", color: "white" }
                  }
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ArrowForwardIosIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pocetna;
