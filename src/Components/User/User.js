import React, { useContext } from "react";
import "../../CSS/User.css";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
const User = (props) => {
  const { isLightMode } = useContext(AuthContext);
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(
        process.env.REACT_APP_API_URL + `api/User/${props.id}`,
        { headers }
      );
      props.function();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      className="korisnik"
      style={
        isLightMode
          ? {}
          : { border: "3px solid white", background: "black", color: "white" }
      }
    >
      <div className="korisnik-slika">
        <img
          src={process.env.REACT_APP_API_URL + `Images/${props.imageName}`}
          alt={`${props.img}`}
        />
      </div>
      <div className="korisnik-informacije">
        <div>
          <h3>
            {props.firstName} {props.lastName}
          </h3>
        </div>
        <div>
          <h3>{props.email}</h3>
        </div>
        <div>
          {props.role === 0 ? (
            <div>
              <h3>Kupac</h3>
            </div>
          ) : (
            ""
          )}
          {props.role === 1 ? (
            <div>
              <h3>Prodavac</h3>
            </div>
          ) : (
            ""
          )}
          {props.role === 2 ? (
            <div>
              <h3>Administrator</h3>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="korisnik-dugme">
        <Button
          fullWidth
          variant="contained"
          onClick={handleDelete}
          sx={{
            backgroundColor: "red",
            display: "flex",
            justifyContent: "space-between",
            ":hover": { backgroundColor: "#ddf2fd", color: "red" },
          }}
        >
          Izbrisi korisnika
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};
export default User;
