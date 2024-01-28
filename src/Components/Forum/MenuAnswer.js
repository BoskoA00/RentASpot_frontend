import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link, useNavigate } from "react-router-dom";
import "../../CSS/Question.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
const ITEM_HEIGHT = 48;

export default function OpcijeOdgovora(props) {
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
      await axios.delete(
        `http://boskowindows-001-site1.anytempurl.com/api/Answer/${props.id}`
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
