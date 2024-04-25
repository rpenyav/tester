import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { decodeJwt, type JWTPayload } from "jose";
import apiService from "./services/apiService";

const UserContext = createContext<any>(null);

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userNeim, setUserNeim] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = decodeJwt(token) as JWTPayload & {
          username?: string;
        };

        if (
          decodedToken &&
          typeof decodedToken === "object" &&
          "username" in decodedToken
        ) {
          const username = decodedToken.username;
          if (typeof username === "string") {
            setUserNeim(username);
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userNeim) {
      const fetchUserData = async () => {
        try {
          const data = await apiService.getUserByUsername(userNeim);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userNeim]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
