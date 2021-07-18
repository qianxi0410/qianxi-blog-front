import { AxiosPromise } from 'axios';
import axios from '../axios/index';

export function test(): AxiosPromise {
  return axios({
    url: `/post/1`,
    method: 'GET'
  });
}
