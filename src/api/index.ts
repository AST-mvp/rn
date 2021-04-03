import { getToken } from '@src/utils/auth';
import axios from 'axios';

// const baseURL = process.env.NODE_ENV === 'development'
//   ? 'https://dev.cragon.me/api'
//   : 'http://server.devleo.tech:5000';
const baseURL = 'http://server.devleo.tech:5001';

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
