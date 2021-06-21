import { getToken } from '@src/utils/auth';
import axios from 'axios';

const baseURL = 'http://d0hwq1.xyz:10005';

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${(await getToken())?.token}`,
  };
  return config;
});

export default api;
