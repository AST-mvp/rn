import { getToken } from '@src/utils/auth';
import axios from 'axios';

const baseURL = 'https://d0hwq1.xyz/';

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
