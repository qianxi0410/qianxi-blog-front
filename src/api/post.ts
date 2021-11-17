import { Post, PostWrapper, Response } from '@/types';
import { AxiosPromise } from 'axios';
import axios from '../axios/index';
import { pageSize } from '../config/index';
import { systemVisit } from './system';

export function getPost(id: number): AxiosPromise<Response<PostWrapper>> {
  systemVisit(`/post/id/${id}`);
  return axios({
    url: `/post/id/${id}`,
    method: 'GET'
  });
}

export function getPosts(page: number): AxiosPromise<Response<Post[]>> {
  return axios({
    url: `/post/page/${page}/size/${pageSize}`,
    method: `GET`
  });
}

export function getPostsWithTag(
  page: number,
  tag: string
): AxiosPromise<Response<Post[]>> {
  return axios({
    url: `/post/page/${page}/size/${pageSize}/tag/${tag}`,
    method: 'GET'
  });
}

export function getCount(): AxiosPromise<Response<number>> {
  return axios({
    url: `/post/count`,
    method: 'GET'
  });
}

export function getCountWithTag(tag: string): AxiosPromise<Response<number>> {
  return axios({
    url: `/post/count/tag/${tag}`,
    method: 'GET'
  });
}
