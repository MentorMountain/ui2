import { Navigate, useLocation } from "react-router-dom";
import FullPageSpinner from "../common/FullPageSpinner";
import { LOGIN_PAGE } from "../paths";
import { useLoginContext } from "./auth/LoginContextProvider";

export function RequireLogin({ children }: { children: JSX.Element }) {
  const { username, isInitialized } = useLoginContext();
  const location = useLocation();

  if (!isInitialized) {
    return <FullPageSpinner />;
  }

  if (!username) {
    return <Navigate to={LOGIN_PAGE} state={{ from: location }} replace />;
  }

  return children;
}
