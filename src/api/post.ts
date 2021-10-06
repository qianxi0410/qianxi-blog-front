import { Post, PostWrapper, Response } from '@/types';
import { AxiosPromise } from 'axios';
import axios from '../axios/index';
import { pageSize } from '../config/index';

export function getPost(id: number): AxiosPromise<Response<PostWrapper>> {
  return axios({
    url: `/blog/post/id/${id}`,
    method: 'GET'
  });
}

export function getPosts(page: number): AxiosPromise<Response<Post[]>> {
  return axios({
    url: `/blog/post/page/${page}/size/${pageSize}`,
    method: `GET`
  });
}

export function getPostsWithTag(
  page: number,
  tag: string
): AxiosPromise<Response<Post[]>> {
  return axios({
    url: `/blog/post/page/${page}/size/${pageSize}/tag/${tag}`,
    method: 'GET'
  });
}

export function getCount(): AxiosPromise<Response<number>> {
  return axios({
    url: `/blog/post/count`,
    method: 'GET'
  });
}

export function getCountWithTag(tag: string): AxiosPromise<Response<number>> {
  return axios({
    url: `/blog/post/count/tag/${tag}`,
    method: 'GET'
  });
}
