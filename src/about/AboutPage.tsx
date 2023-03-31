import React, { useEffect, useState } from "react";
import { blogHealthEndpoint } from "../blog/service/BlogService";
import ENV from "../env";
import { loginHealthEndpoint } from "../login/auth/LoginService";
import { questionsHealthEndpoint } from "../questions/service/QuestionsService";
import { Table } from "react-bootstrap";
import { ServiceStatus } from "./ServiceStatus";
import ServiceRow from "./ServiceRow";
import { time } from "console";

function defaultServiceStatus(name: string): ServiceStatus {
  return {
    name,
    isOnline: false,
    responseTime: 0,
  };
}

export default function AboutPage() {
  const [blogStatus, setBlogStatus] = useState<ServiceStatus>(
    defaultServiceStatus("Blog")
  );
  const [questionsStatus, setQuestionsStatus] = useState<ServiceStatus>(
    defaultServiceStatus("Questions")
  );
  const [loginStatus, setLoginStatus] = useState<ServiceStatus>(
    defaultServiceStatus("Login")
  );

  useEffect(() => {
    const startTime: number = Date.now();

    blogHealthEndpoint().then((status) =>
      setBlogStatus({
        ...blogStatus,
        isOnline: status,
        responseTime: Date.now() - startTime,
      })
    );
    questionsHealthEndpoint().then((status) =>
      setQuestionsStatus({
        ...questionsStatus,
        isOnline: status,
        responseTime: Date.now() - startTime,
      })
    );
    loginHealthEndpoint().then((status) =>
      setLoginStatus({
        ...loginStatus,
        isOnline: status,
        responseTime: Date.now() - startTime,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>{ENV.API_DOMAIN}</h3>
      <Table hover>
        <thead>
          <tr>
            <th>Service</th>
            <th>Reachable</th>
            <th>Response Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          <ServiceRow service={blogStatus} />
          <ServiceRow service={questionsStatus} />
          <ServiceRow service={loginStatus} />
        </tbody>
      </Table>
    </>
  );
}
