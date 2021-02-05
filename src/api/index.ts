import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development'
  ? 'https://dev.cragon.me/api'
  : 'http://server.devleo.tech:5000';

const api = axios.create({
  baseURL,
});

export default api;
