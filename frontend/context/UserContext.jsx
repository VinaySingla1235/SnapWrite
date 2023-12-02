import { createContext, useEffect, useState } from "react";
import { url } from "../src/url";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const response = await fetch(url + "/api/auth/refetch", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getUser()
  },[])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
