import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useSearchParams } from "react-router-dom";
import ENV from "../env";

export default function LoginPage() {
  const SFU_TICKET_PARAM = "ticket";
  const location = window.location.href.split("?")[0];
  const loginLink = `${ENV.SFU_CAS_LOGIN}/?renew=true&service=${location}`;

  const [isSFUTicketProvided, setIsSFUTicketProvided] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [processingLogin, setProcessingLogin] = useState(false);

  const [temp, setTemp] = useState("");

  const onSFULoginClicked = () => {
    window.location.href = loginLink;
  };

  console.log(process.env.NODE_ENV);

  useEffect(() => {
    setIsSFUTicketProvided(searchParams.has(SFU_TICKET_PARAM));

    if (isSFUTicketProvided) {
      const ticket = searchParams.get(SFU_TICKET_PARAM)!;
      setProcessingLogin(true);

      axios
        .post(ENV.API_DOMAIN + "/api/login", {
          sfuToken: ticket,
          referrer: location,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            const token = decodeToken(response.data.token);
            const { computingID } = token as any;
            setTemp(computingID);
            setProcessingLogin(false);
          }
        })
        .catch(() => {
          setProcessingLogin(false);
        });

      setSearchParams({});
      setIsSFUTicketProvided(false);
    }
  }, [isSFUTicketProvided, setSearchParams, searchParams, location]);

  return (
    <>
      <h1>Login</h1>
      {temp && <p>Hi {JSON.stringify(temp)}</p>}
      {processingLogin && <p>Verifying SFU Login</p>}
      {!processingLogin && !temp && (
        <>
          <Button onClick={onSFULoginClicked}>Login with SFU</Button>
        </>
      )}
    </>
  );
}
