import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userEmail: "",
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const [token, setToken] = useState(initialToken);
  const [userEmail, setUserEmail] = useState(initialEmail);

  const userIsLoggedIn = !!token;

  let logoutTimer;
  const userLoginHandler = (token, userEmail, expiresIn) => {
    setToken(token);
    setUserEmail(userEmail);
    localStorage.setItem("token", token);
    localStorage.setItem('email', userEmail);

    // Set up a timer to automatically log out the user after the token expires here we taking after 5 minute logout
    logoutTimer = setTimeout(() => {
      userLogoutHandler();
    }, expiresIn * 1000);

    const expirationTime = Date.now() + expiresIn * 1000;
    localStorage.setItem("expirationTime", expirationTime);
  };

  const userLogoutHandler = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem('email');
    localStorage.removeItem("expirationTime");

    clearTimeout(logoutTimer);
  };

  useEffect(() => {
    const storedExpirationTime = localStorage.getItem("expirationTime");
    const remainingTime = storedExpirationTime - Date.now();

    if (remainingTime > 0) {
      logoutTimer = setTimeout(() => {
        userLogoutHandler();
      }, remainingTime);
    }
  }, []);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userEmail: userEmail,
    login: userLoginHandler,
    logout: userLogoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
