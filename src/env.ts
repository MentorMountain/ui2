const ENV = {
  API_DOMAIN: process.env.REACT_APP_API_DOMAIN,
  SFU_CAS_LOGIN: process.env.REACT_APP_SFU_CAS_LOGIN
};

Object.entries(ENV).forEach(([k, v]) => {
  if (!v) {
    console.error(`environment variable ${k} is not provided`);
    process.exit(1);
  }
});

export default ENV;
