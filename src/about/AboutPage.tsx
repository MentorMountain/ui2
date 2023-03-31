import React, { useEffect, useState } from "react";
import { blogHealthEndpoint } from "../blog/service/BlogService";
import ENV from "../env";
import { loginHealthEndpoint } from "../login/auth/LoginService";
import { questionsHealthEndpoint } from "../questions/service/QuestionsService";

export default function AboutPage() {
  const [blogStatus, setBlogStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [questionsStatus, setQuestionsStatus] = useState(false);

  useEffect(() => {
    blogHealthEndpoint().then((status) => setBlogStatus(status));
    questionsHealthEndpoint().then((status) => setQuestionsStatus(status));
    loginHealthEndpoint().then((status) => setLoginStatus(status));
  }, []);

  return (
    <>
      <h1>About</h1>
      <p>{ENV.API_DOMAIN}</p>
      <p>Blog: {blogStatus ? "true" : "false"}</p>
      <p>Questions: {questionsStatus ? "true" : "false"}</p>
      <p>Login: {loginStatus ? "true" : "false"}</p>
    </>
  );
}
