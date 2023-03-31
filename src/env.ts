const IN_PRODUCTION: boolean = process.env.NODE_ENV === "production";
const HCAPTCHA_DEV_SITE_KEY = "10000000-ffff-ffff-ffff-000000000001";

const ENV = {
  API_DOMAIN: process.env.REACT_APP_API_DOMAIN,
  SFU_CAS_LOGIN: process.env.REACT_APP_SFU_CAS_LOGIN,
  IN_PRODUCTION,
  HCAPTCHA_SITE_KEY: IN_PRODUCTION
    ? process.env.REACT_APP_HCAPTCHA_SITE_KEY
    : HCAPTCHA_DEV_SITE_KEY,
};

Object.entries(ENV).forEach(([k, v]) => {
  if (k !== "IN_PRODUCTION" && !v) {
    console.error(`environment variable ${k} is not provided`);
  }
});

export default ENV;
