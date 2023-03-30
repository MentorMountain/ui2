import axios from "axios";
import ENV from "../../env";

export async function blogHealthEndpoint(): Promise<boolean> {
  try {
    return (
      (await axios.get(ENV.API_DOMAIN + "/api/blog/health")).status === 200
    );
  } catch {
    return false;
  }
}
