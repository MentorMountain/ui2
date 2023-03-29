import axios from "axios";
import ENV from "../../env";
export interface LoginResponse {
  success: boolean;
  error?: string;
  token?: string;
}

export async function loginEndpoint(
  sfuToken: string,
  referrer: string
): Promise<LoginResponse> {
  try {
    const response = await axios.post(ENV.API_DOMAIN + "/api/login", {
      sfuToken,
      referrer,
    });
    return response.data as LoginResponse;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: JSON.stringify(e),
    };
  }
}
