import React, { ReactNode, useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { blogHealthEndpoint } from "../../blog/service/BlogService";
import { questionsHealthEndpoint } from "../../questions/service/QuestionsService";
import {
  loginEndpoint,
  loginHealthEndpoint,
  loginIntrospection,
  signupEndpoint,
} from "./LoginService";
import { UserRole } from "./UserRole";

interface LoginContextType {
  jwt: string;
  username: string;
  role: UserRole;
  isInitialized: boolean;

  login: (
    username: string,
    password: string,
    callback: VoidFunction
  ) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<boolean>;
  refreshLogin: (token: string, callback: VoidFunction) => Promise<boolean>;
  logout: (callback: VoidFunction) => void;
}

export const LoginContext = React.createContext<LoginContextType>(
  {} as LoginContextType
);

export function LoginContextProvider({ children }: { children: ReactNode }) {
  const [jwt, setJWT] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<UserRole>("");

  const tokenStorage = "mm-token";

  const assignFromToken = (token: string) => {
    const payload = decodeToken(token) as {
      username: string;
      role: UserRole;
    };

    if (payload) {
      setJWT(token);
      setUsername(payload.username);
      setRole(payload.role);
    }
  };

  const clearData = () => {
    setJWT("");
    setUsername("");
    setRole("");
    localStorage.removeItem(tokenStorage);
  };

  const refreshLogin = async (token: string, callback: VoidFunction) => {
    const success = await loginIntrospection(token);
    console.log("token introspection success", token);

    if (success) {
      assignFromToken(token);
    } else {
      clearData();
    }

    callback();
    return success;
  };

  const login = async (
    username: string,
    password: string,
    callback: VoidFunction
  ) => {
    const response = await loginEndpoint(username, password);

    if (response.success) {
      assignFromToken(response.token!);
      localStorage.setItem(tokenStorage, response.token!);
    } else {
      clearData();
      console.error("Failed to login");
    }

    callback();
    return response.success;
  };

  const signup = async (username: string, password: string) => {
    const signupSuccess = await signupEndpoint(username, password);

    if (signupSuccess) {
      console.log("Signup success");
      return await login(username, password, () =>
        console.log("Logging in after successful signup")
      );
    }

    console.log("Failed to signup user");

    return false;
  };

  const logout = (callback: VoidFunction) => {
    clearData();
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
    username,
    role,
    isInitialized,
    login,
    signup,
    refreshLogin,
    logout,
  };

  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}
