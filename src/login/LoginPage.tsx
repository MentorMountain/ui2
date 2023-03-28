import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ENV from "../env";
import { decodeToken } from "react-jwt";

export default function LoginPage() {
  const SFU_TICKET_PARAM = "ticket";
  const location = window.location.href.split("?")[0];
  const loginLink = `${ENV.SFU_CAS_LOGIN}/?renew=true&service=${location}`;

  const [isSFUTicketProvided, setIsSFUTicketProvided] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [temp, setTemp] = useState("");

  const onSFULoginClicked = () => {
    window.location.href = loginLink;
  };

  useEffect(() => {
    setIsSFUTicketProvided(searchParams.has(SFU_TICKET_PARAM));
    console.log("ticket", searchParams.has(SFU_TICKET_PARAM));

    if (isSFUTicketProvided) {
      const ticket = searchParams.get(SFU_TICKET_PARAM)!;
      console.log("Processing", ticket);

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
          }
        });

      setSearchParams({});
      setIsSFUTicketProvided(false);
    }
  }, [isSFUTicketProvided, setSearchParams, searchParams, location]);

  return (
    <>
      <h1>Login</h1>
      {temp && <p>Hi {JSON.stringify(temp)}</p>}
      {!isSFUTicketProvided && !temp && (
        <>
          <Button onClick={onSFULoginClicked}>Login with SFU</Button>
        </>
      )}
    </>
  );
}
