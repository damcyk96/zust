import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MonoText } from "../components/StyledText";

export const AuthContext = createContext({
  isAuth: false,
  isLoading: true,
  setToken: () => {},
  removeToken: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const setToken = async (token) => {
    await AsyncStorage.setItem("token", token);
    setIsAuth(true);
  };

  const removeToken = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuth(false);
  };

  const loadToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      setIsAuth(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, isLoading, setToken, removeToken }}>
      {isLoading ? <MonoText>Loading</MonoText> : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
