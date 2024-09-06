import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "../../CSS/Question.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function AnswerOptions(props) {
  const { isLightMode } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(
        process.env.REACT_APP_API_URL + `api/Answer/${props.id}`,
        { headers }
      );
      navigate("/forum");
    } catch (e) {
      console.log("Error:" + e);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        sx={isLightMode ? {} : { color: "white" }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={isLightMode ? {} : { "& ul": { backgroundColor: "black" } }}
      >
        <MenuItem
          sx={
            isLightMode
              ? { display: "flex", justifyContent: "space-between" }
              : { color: "white", backgroundColor: "black" }
          }
          onClick={handleDelete}
        >
          Izbiris odgovor
          <DeleteIcon />
        </MenuItem>
      </Menu>
    </div>
  );
}
