import axios from "axios";
import ENV from "../../env";

export async function questionsHealthEndpoint(): Promise<boolean> {
    try {
      return (
        (await axios.get(ENV.API_DOMAIN + "/api/questions/health")).status === 200
      );
    } catch {
      return false;
    }
  }