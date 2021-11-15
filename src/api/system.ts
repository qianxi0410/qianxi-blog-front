import { AxiosPromise } from 'axios';
import { Response, SystemInfo } from '@/types/index';
import axios from '../axios/index';

export function systemInfo(): AxiosPromise<Response<SystemInfo>> {
  return axios({
    url: `/system/info`,
    method: 'get'
  });
}
