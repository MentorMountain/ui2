import { useSearchParams } from "react-router-dom";
import ENV from "../env";

export default function LoginPage() {
  const loginLink = `${ENV.SFU_CAS_LOGIN}/?renew=true&service=${window.location.href}`;

  return (
    <>
      <h1>Login</h1>
      <p>Hi</p>

      <a href={loginLink}>Login with SFU</a>
    </>
  );
}
