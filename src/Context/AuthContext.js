import { createContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  setUserFunction: (userData) => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLightMode, setIsLightMode] = useState(true);
  const setUserFunction = (userData) => {
    setUser((user) => (user = userData));
  };
  const setIsLightModeFunction = () => {
    setIsLightMode(!isLightMode);
  };
  const setUserOglasi = (data) => {
    setUser((prevUser) => ({
      ...prevUser,
      oglasi: data,
    }));
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUserFunction,
        setUserOglasi,
        isLightMode,
        setIsLightModeFunction,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
