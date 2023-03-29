## .env file
Create a .env file in the project root.
```
REACT_APP_API_DOMAIN="<API_GATEWAY_URL>"
REACT_APP_SFU_CAS_LOGIN="https://cas.sfu.ca/cas/login"
```

## Deploy
1. Build: `yarn build`
2. Deploy: `gcloud app deploy app.yaml`
