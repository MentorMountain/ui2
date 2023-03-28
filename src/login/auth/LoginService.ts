import axios from "axios";
import ENV from "../../env";

interface LoginServiceState {
  token: string;
  login: (sfuToken: string, referrer: string, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

interface LoginResponse {
  success: boolean;
  error?: string;
  token?: string;
}

const LoginService: LoginServiceState = {
  token: "",
  login: async (sfuToken: string, referrer: string, callback: VoidFunction) => {
    try {
      const loginResponse = await axios.post(ENV.API_DOMAIN + "/api/login", {
        sfuToken,
        referrer,
      });

      const { success, error, token } = loginResponse.data as LoginResponse;
      if (success) {
        LoginService.token = token!;
        callback();
      } else {
        console.error(error);
      }
    } catch (e) {
      console.error("login failure", e);
    }
  },
  logout: async (callback: VoidFunction) => {
    LoginService.token = "";
    console.log("Logging out");
    callback();
  },
};

export { LoginService };
