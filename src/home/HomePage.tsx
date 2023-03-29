import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { LOGIN_PAGE } from "../paths";

export default function HomePage() {
  const navigate = useNavigate();
  const { computingID, logout } = useLoginContext();

  return (
    <>
      <h1>Mentor Mountain</h1>
      {!computingID && (
        <Button onClick={() => navigate(LOGIN_PAGE)}>Login</Button>
      )}
      {computingID && <Button onClick={() => logout(() => 0)}>Logout</Button>}
    </>
  );
}
