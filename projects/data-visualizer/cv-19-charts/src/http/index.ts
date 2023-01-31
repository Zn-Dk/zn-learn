import axios from "axios";
import type { AxiosInstance } from "axios";
const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.response.use((res) => {
  return res?.data?.data;
});

const apis = {
  list: "/api/list",
};

export const getApiList = (): Promise<any> => {
  return instance.get(apis.list);
};
