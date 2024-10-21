import { GATEWAY_ENDPOINT_WITHOUT_VERSION } from "../axios.config";

export const company_apis = {
  $_create_company(payload: any) {
    const url = '/company/create'
    return GATEWAY_ENDPOINT_WITHOUT_VERSION.post(url, payload);
  },
};
