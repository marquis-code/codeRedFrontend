import { GATEWAY_ENDPOINT  } from "../axios.config";

export const hospital_apis = {
  $_fetch_hospitals() {
    const url = '/hospitals'
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_nearby_hospitals(query: {latitude: number, longitude: number, maxDistance: number}) {
    const { latitude, longitude, maxDistance } = query;
    const url = `/hospitals/nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}`;
    return GATEWAY_ENDPOINT.get(url);
  },  
  $_fetch_hospital_by_id(id: any) {
    const url = '/hospitals/${id}'
    return GATEWAY_ENDPOINT.get(url);
  },
};
