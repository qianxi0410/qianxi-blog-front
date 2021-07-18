import axios from 'axios';

import { baseUrl } from '../config/index';

const http = axios.create({
  baseURL: baseUrl,
  timeout: 5000
});

http.interceptors.request.use(
  config =>
    // if (store.getters.token) {
    //   config.headers['Qianxi-Token'] = getToken();
    // }
    config,
  error => {
    console.log(`err -> ${error}`); // for debug
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => response,
  error => {
    console.log(`err -> ${error}`); // for debug
    return Promise.reject(error);
  }
);

export default http;
