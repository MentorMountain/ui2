import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ENV from "../env";
import { HOME_PAGE } from "../paths";
import { useLoginContext } from "./auth/LoginContextProvider";

export default function LoginPage() {
  const { login, computingID } = useLoginContext();
  const reactNavigate = useNavigate();

  const SFU_TICKET_PARAM = "ticket";
  const location = window.location.href.split("?")[0];
  const loginLink = `${ENV.SFU_CAS_LOGIN}/?renew=true&service=${location}`;

  const [isSFUTicketProvided, setIsSFUTicketProvided] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [processingLogin, setProcessingLogin] = useState(false);

  const onSFULoginClicked = () => {
    window.location.href = loginLink;
  };

  console.log(process.env.NODE_ENV);

  useEffect(() => {
    setIsSFUTicketProvided(searchParams.has(SFU_TICKET_PARAM));

    if (isSFUTicketProvided) {
      const ticket = searchParams.get(SFU_TICKET_PARAM)!;
      setProcessingLogin(true);

      login(ticket, location, () => console.log("Done login verify")).then(
        (result) => {
          setProcessingLogin(false);
          reactNavigate(HOME_PAGE);
        }
      );

      setSearchParams({});
      setIsSFUTicketProvided(false);
    }
  }, [
    isSFUTicketProvided,
    setSearchParams,
    searchParams,
    location,
    login,
    reactNavigate,
  ]);

  return (
    <>
      <h1>Login</h1>
      {computingID && <p>Hi {computingID}</p>}
      {processingLogin && <p>Verifying SFU Login</p>}
      {!processingLogin && !computingID && (
        <>
          <Button onClick={onSFULoginClicked}>Login with SFU</Button>
        </>
      )}
    </>
  );
}
