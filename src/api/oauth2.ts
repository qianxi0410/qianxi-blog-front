import { AxiosPromise } from 'axios';
import axios from '../axios/index';

export function getUserInfo(code: string): AxiosPromise {
  return axios({
    url: `/oauth2/code/${code}`,
    method: 'GET'
  });
}
