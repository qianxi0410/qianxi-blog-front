import { AxiosPromise } from 'axios';
import axios from '../axios/index';
import { pageSize } from '../config/index';

export function getPost(id: number): AxiosPromise {
  return axios({
    url: `/post/${id}`,
    method: 'GET'
  });
}

export function getPosts(page: number): AxiosPromise {
  return axios({
    url: `/post/page/${page}/size/${pageSize}`,
    method: `GET`
  });
}

export function getPostsWithTag(page: number, tag: string): AxiosPromise {
  return axios({
    url: `/post/page/${page}/size/${pageSize}/tag/${tag}`,
    method: 'GET'
  });
}

export function getCount(): AxiosPromise {
  return axios({
    url: `/post/count`,
    method: 'GET'
  });
}

export function getCountWithTag(tag: string): AxiosPromise {
  return axios({
    url: `/post/count/tag/${tag}`,
    method: 'GET'
  });
}
