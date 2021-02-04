import axios from 'axios';

const api = axios.create({
  baseURL: 'http://server.devleo.tech:5000',
});

export default api;
