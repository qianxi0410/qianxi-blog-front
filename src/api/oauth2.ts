import { AxiosPromise } from 'axios';
import { Response } from '@/types';
import axios from '../axios/index';

export function getUserInfo(code: string): AxiosPromise<Response<string>> {
  return axios({
    url: `/oauth2/code/${code}`,
    method: 'GET'
  });
}
