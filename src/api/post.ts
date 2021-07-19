import { AxiosPromise } from 'axios';
import axios from '../axios/index';
import { size } from '../config/index';

export function getPost(id: number): AxiosPromise {
  return axios({
    url: `/post/${id}`,
    method: 'GET'
  });
}

export function getPosts(page: number): AxiosPromise {
  return axios({
    url: `/post/page/${page}/size/${size}`,
    method: `GET`
  });
}
