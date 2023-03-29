const ENV = {
  API_DOMAIN: process.env.REACT_APP_API_DOMAIN,
  SFU_CAS_LOGIN: process.env.REACT_APP_SFU_CAS_LOGIN,
  IN_PRODUCTION: process.env.NODE_ENV === "production",
};

Object.entries(ENV).forEach(([k, v]) => {
  if (k !== "IN_PRODUCTION" && !v) {
    console.error(`environment variable ${k} is not provided`);
  }
});

export default ENV;
