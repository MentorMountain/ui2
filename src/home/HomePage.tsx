import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../paths";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Mentor Mountain</h1>
      <Button onClick={() => navigate(LOGIN_PAGE)}>Login</Button>
    </>
  );
}
