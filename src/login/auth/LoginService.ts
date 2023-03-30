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

export async function loginIntrospection(token: string): Promise<boolean> {
  try {
    const authHeader = {
      Authorization: token,
    };
    const response = await axios.get(
      ENV.API_DOMAIN + "/api/login/introspection",
      { headers: authHeader }
    );

    return response.status === 200;
  } catch (err) {
    return (err as any)?.response?.status !== 401;
  }
}

export async function loginHealthEndpoint(): Promise<boolean> {
  try {
    return (
      (await axios.get(ENV.API_DOMAIN + "/api/login/health")).status === 200
    );
  } catch {
    return false;
  }
}
