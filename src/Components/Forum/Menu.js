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
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Opcije(props) {
  const { user, isLightMode } = useContext(AuthContext);
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
        `http://boskowindows-001-site1.anytempurl.com/api/Question/${props.id}`
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
        onClick={handleClick}
        sx={isLightMode ? {} : { color: "white" }}
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
        {user && (props.userId === user.id || user.role === 2) && (
          <div>
            <MenuItem
              sx={
                isLightMode
                  ? { display: "flex", justifyContent: "space-between" }
                  : { color: "white", backgroundColor: "black" }
              }
              onClick={handleDelete}
            >
              Izbrisi pitanje
              <DeleteIcon />
            </MenuItem>
            <Link
              className="link"
              underline="none"
              to={`/${props.id}/editQuestion`}
            >
              <MenuItem
                sx={
                  isLightMode
                    ? { display: "flex", justifyContent: "space-between" }
                    : { color: "white", backgroundColor: "black" }
                }
              >
                Izmeni pitanje
                <EditIcon />
              </MenuItem>
            </Link>
          </div>
        )}
        <Link
          className="link"
          underline="none"
          to={`/${props.id}/CreateAnswer`}
        >
          <MenuItem
            sx={
              isLightMode
                ? { display: "flex", justifyContent: "space-between" }
                : { color: "white", backgroundColor: "black" }
            }
          >
            Odgovori
            <ReplyIcon />
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
