import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import ENV from "./env";

function App() {
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
  });

  return (
    <div className="App">
      <header className="App-header"></header>
      <p>Hi</p>
      <p>{ENV.API_DOMAIN}</p>
      <p>{ENV.SFU_CAS_LOGIN}</p>
      {Object.entries({
        blog: blogStatus,
        questions: questionsStatus,
        login: loginStatus,
      }).map(([k, v], i) => {
        return (
          <p key={i}>
            {k}: {v}
          </p>
        );
      })}
    </div>
  );
}

export default App;
