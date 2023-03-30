import React, { ReactNode, useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { blogHealthEndpoint } from "../../blog/service/BlogService";
import { questionsHealthEndpoint } from "../../questions/service/QuestionsService";
import {
  loginEndpoint,
  loginHealthEndpoint,
  loginIntrospection,
} from "./LoginService";
import { UserRole } from "./UserRole";

interface LoginContextType {
  jwt: string;
  computingID: string;
  role: UserRole;
  isInitialized: boolean;

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
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
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
    blogHealthEndpoint();
    questionsHealthEndpoint();
    loginHealthEndpoint();

    let cancelled = false;
    const update = async () => {
      const candidateToken = localStorage.getItem(tokenStorage);

      if (!cancelled && candidateToken) {
        if (await loginIntrospection(candidateToken)) {
          console.log("Valid token");
          assignFromToken(candidateToken);
        } else {
          console.warn("Invalid token");
          logout(() => console.warn("Expired token"));
        }
      }
      setIsInitialized(true);
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
    isInitialized,
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
