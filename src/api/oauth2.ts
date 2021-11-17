import { AxiosPromise } from 'axios';
import { Response } from '@/types';
import axios from '../axios/index';
import { systemVisit } from './system';

export function getUserInfo(code: string): AxiosPromise<Response<string>> {
  systemVisit(`/oauth2/code/${code}`);
  return axios({
    url: `/oauth2/code/${code}`,
    method: 'GET'
  });
}
