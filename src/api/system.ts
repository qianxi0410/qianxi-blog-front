import { AxiosPromise } from 'axios';
import { Response, SystemInfo } from '@/types/index';
import axios from '../axios/index';

export function systemInfo(): AxiosPromise<Response<SystemInfo>> {
  return axios({
    url: `/system/info`,
    method: 'get'
  });
}

export function systemVisit(uri: string): AxiosPromise<Response<null>> {
  return axios({
    url: `/system/visit`,
    method: 'POST',
    data: {
      uri
    }
  });
}
