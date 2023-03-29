import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_PAGE } from "../paths";
import { useLoginContext } from "./auth/LoginContextProvider";

export function RequireLogin({ children }: { children: JSX.Element }) {
  const { computingID } = useLoginContext();
  const location = useLocation();

  if (!computingID) {
    return <Navigate to={LOGIN_PAGE} state={{ from: location }} replace />;
  }

  return children;
}
