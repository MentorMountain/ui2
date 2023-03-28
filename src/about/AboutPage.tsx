import axios from "axios";
import React, { useEffect, useState } from "react";
import ENV from "../env";

export default function AboutPage() {
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
  }, []);
  return (
    <>
      <h1>About</h1>
      <p>{ENV.API_DOMAIN}</p>
      <p>{ENV.SFU_CAS_LOGIN}</p>
      <p>Blog: {blogStatus ? "true" : "false"}</p>
      <p>Questions: {questionsStatus ? "true" : "false"}</p>
      <p>Login: {loginStatus ? "true" : "false"}</p>
    </>
  );
}