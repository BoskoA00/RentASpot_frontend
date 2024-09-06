import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Users.css";
import User from "../Components/User/User.js";
const Users = () => {
  const { isLightMode, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    getUsers();
  }, []);
  function getUser() {
    try {
      getUsers();
    } catch (e) {}
  }
  const getUsers = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "api/User"
      );
      setUsers(response.data);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  return (
    <div
      className="users-main"
      style={isLightMode ? {} : { backgroundColor: "#202020" }}
    >
      {users && users.length > 0 ? (
        users.map((u) => {
          if (u.id !== user.id)
            return (
              <User
                key={u.id}
                id={u.id}
                firstName={u.firstName}
                lastName={u.lastName}
                email={u.email}
                imageName={u.imageName}
                role={u.role}
                function={getUser}
              />
            );
        })
      ) : (
        <div>Nema drugih korisnika aplikacije</div>
      )}
    </div>
  );
};
export default Users;
