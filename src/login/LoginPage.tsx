import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ENV from "../env";

export default function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [blogStatus, setBlogStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [questionsStatus, setQuestionsStatus] = useState(false);

  useEffect(() => {
    axios.get(ENV.API_DOMAIN + "/api/blog/health").then((res) => {
      setBlogStatus(res.status === 200);
    });
    axios.get(ENV.API_DOMAIN + "/api/login/health").then((res) => {
      setLoginStatus(res.status === 200);
    });
    axios.get(ENV.API_DOMAIN + "/api/questions/health").then((res) => {
      setQuestionsStatus(res.status === 200);
    });

    const sfuTicketParam = "ticket";
    if (searchParams.has(sfuTicketParam)) {
      const sfuTicket = searchParams.get(sfuTicketParam);

     

      const referrer = window.location.href.replace(window.location.search, "")

      console.log(
        "Dispatching login verify request with",
        sfuTicket,
        "to",
        ENV.API_DOMAIN! + "/api/login",
        "by referrer",
        referrer
      );

      axios
        .post(ENV.API_DOMAIN! + "/api/login", {
          sfuToken: sfuTicket,
          referrer,
        })
        .then((response) => {
          console.log(response.statusText, response.data);
        })
        .catch((e) => {
          console.error(JSON.stringify(e));
        });

      searchParams.delete(sfuTicketParam);
    }
  }, [searchParams, setSearchParams]);

  const loginLink = `${ENV.SFU_CAS_LOGIN}/?renew=true&service=${window.location.href}`;

  return (
    <>
      <h1>Login</h1>
      <p>Hi</p>
      <p>{ENV.API_DOMAIN}</p>
      <p>{ENV.SFU_CAS_LOGIN}</p>
      <p>Blog: {blogStatus ? "true" : "false"}</p>
      <p>Questions: {questionsStatus ? "true" : "false"}</p>
      <p>Login: {loginStatus ? "true" : "false"}</p>
      <a href={loginLink}>Login with SFU</a>
    </>
  );
}
