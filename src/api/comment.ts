import { AxiosPromise } from 'axios';
import { Comment } from '@/types/index';
import axios from '../axios/index';

export function saveComment(comment: Comment): AxiosPromise {
  return axios({
    url: `/blog/comment/save`,
    method: 'POST',
    data: comment
  });
}

export function deleteComment(commentId: number): AxiosPromise {
  return axios({
    url: `/blog/comment/${commentId}`,
    method: 'DELETE'
  });
}
