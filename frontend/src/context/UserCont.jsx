import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    console.log("Token from localStorage: ", token);
    const fetchUser = async (id) => {

      if(!token) {
        console.log("No token available");
        return;
      }
      console.log("Token before fetch: ", token);

      const url = `/users/${id}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, requestOptions);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          localStorage.setItem("access_token", token);
          console.log("User fetched");
        } else {
          console.log("User not fetched");
          setToken(null);
          localStorage.removeItem("access_token");
        }
      } catch (error) {
               console.log("Error fetching user", error);
        setToken(null);
        localStorage.removeItem("access_token");
      }
    };

    fetchUser();
  }, [token]);

  const userId = user ? user.id : null;

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser, userId }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
