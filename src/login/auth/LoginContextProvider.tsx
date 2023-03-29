import React, { ReactNode, useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { loginEndpoint, loginIntrospection } from "./LoginService";
import { UserRole } from "./UserRole";

interface LoginContextType {
  jwt: string;
  computingID: string;
  role: UserRole;

  login: (
    sfuToken: string,
    referrer: string,
    callback: VoidFunction
  ) => Promise<boolean>;
  logout: (callback: VoidFunction) => void;
}

export const LoginContext = React.createContext<LoginContextType>(
  {} as LoginContextType
);

export function LoginContextProvider({ children }: { children: ReactNode }) {
  const [jwt, setJWT] = useState<string>("");
  const [computingID, setComputingID] = useState<string>("");
  const [role, setRole] = useState<UserRole>("");

  const tokenStorage = "mm-token";

  const assignFromToken = (sfuToken: string) => {
    const payload = decodeToken(sfuToken) as {
      computingID: string;
      role: UserRole;
    };

    if (payload) {
      setJWT(sfuToken);
      setComputingID(payload.computingID);
      setRole(payload.role);
    }
  };

  const login = async (
    sfuToken: string,
    referrer: string,
    callback: VoidFunction
  ) => {
    const response = await loginEndpoint(sfuToken, referrer);

    if (response.success) {
      assignFromToken(response.token!);
      localStorage.setItem(tokenStorage, response.token!);
      callback();
    }

    return response.success;
  };

  const logout = (callback: VoidFunction) => {
    setJWT("");
    setComputingID("");
    setRole("");
    localStorage.removeItem(tokenStorage);
    callback();
  };

  useEffect(() => {
    let cancelled = false;
    const update = async () => {
      const candidateToken = localStorage.getItem(tokenStorage);

      if (!cancelled && candidateToken) {
        if (await loginIntrospection(candidateToken)) {
          console.log("Valid token");
          assignFromToken(candidateToken);
        } else {
          logout(() => console.warn("Expired token"));
        }
      }
    };

    update();

    return () => {
      cancelled = true;
    };
  });

  const context: LoginContextType = {
    jwt,
    computingID,
    role,
    login,
    logout,
  };

  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}
