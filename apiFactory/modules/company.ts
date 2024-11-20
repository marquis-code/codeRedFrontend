import { GATEWAY_ENDPOINT  } from "../axios.config";

export const company_apis = {
  $_create_company(payload: any) {
    const url = '/corporate/create'
    return GATEWAY_ENDPOINT.post(url, payload);
  },
};
