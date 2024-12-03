import React from "react";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const [userGroups, setUserGroups] = useState([]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user-group/", {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });
        setUserGroups(response.data.groups);
        console.log("userGroups", userGroups);
        console.log("response", response.data.groups);
      } catch (error) {
        console.error("Error fetching user groups:", error);
        setUserGroups([]);
      }
    };

    if (authTokens) {
      fetchUserData();
    }
  }, [authTokens]);

  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const loginUser = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/user-cabinet");
      // Fetch user groups
      const groupsResponse = await axios.get("http://127.0.0.1:8000/api/user-group/", {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      });

      const userGroups = groupsResponse.data.groups;

      // Redirect based on group
      if (userGroups.includes("admin")) {
        history.push("/user-cabinet");
      } else if (userGroups.includes("managers")) {
        history.push("/manage");
      } else if (userGroups.includes("technologists")) {
        history.push("/tech");
      } else if (userGroups.includes("ctp_operators")) {
        history.push("/ctp");
      } else {
        history.push("/");
      }

    } else {
      alert("Не правильные имя пользователя или пароль!");
      console.log("1 !#!#!#____", data.detail);
    }
  };

  const registerUser = async (username, password, password2) => {
    try {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        password2
      })
    });
    const data = await response.json();
    if (response.status === 201) {
      history.push("/login");
    } else {
      alert("Something went wrong!");
      return data;
      // console.log("1 !#!#!#", data.username);
      // console.log("2 !#!#!#", data.password2);
    }    
    } catch (error) {
      console.error(error);
    } 
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/");
  };

  const contextData = {
    user,
    setUser,
    userGroups,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
