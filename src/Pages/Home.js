import React, { useContext, useEffect, useState } from "react";
import Search from "../Components/Home/Search";
import Oglas from "../Components/Home/HomeCard";
import Axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import ".././CSS/Home.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Pocetna = () => {
  const { isLightMode } = useContext(AuthContext);
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getAds = async () => {
    try {
      const response = await Axios.get(
        process.env.REACT_APP_API_URL + "api/Ad"
      );
      setAds(response.data);
      setFilteredAds(response.data);
    } catch (e) {
      console.log("Error:" + e);
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  const handleSearch = (searchParams) => {
    const filteredResults = ads.filter((ad) => {
      const matchesDrzava =
        !searchParams.drzava || ad.country.includes(searchParams.drzava);
      const matchesGrad =
        !searchParams.grad || ad.city.includes(searchParams.grad);
      const matchesVelicina =
        searchParams.velicina === 0 || ad.size <= searchParams.velicina;
      const matchesMinCena =
        searchParams.minCena === 0 || ad.price >= searchParams.minCena;
      const matchesMaxCena =
        searchParams.maxCena === 0 || ad.price <= searchParams.maxCena;

      return (
        matchesDrzava &&
        matchesGrad &&
        matchesVelicina &&
        matchesMinCena &&
        matchesMaxCena
      );
    });

    setFilteredAds(filteredResults);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredAds.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOglasi = filteredAds.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div
      className="homepage-main"
      style={isLightMode ? {} : { backgroundColor: "#202020", color: "white" }}
    >
      <Search onSearch={handleSearch} />
      <div
        className="homepage-ads"
        style={isLightMode ? {} : { border: "3px solid white" }}
      >
        <div className="ads">
          {currentOglasi.length === 0 ? (
            <div style={{ textAlign: "center" }}>Nema oglasa</div>
          ) : (
            currentOglasi.map((ad) => (
              <Oglas
                key={ad.id}
                id={ad.id}
                name={ad.title}
                city={ad.country}
                country={ad.city}
                size={ad.size}
                price={ad.price}
                type={ad.type}
                picturePath={ad.picturePath}
              />
            ))
          )}
        </div>

        {filteredAds.length !== 0 && (
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
