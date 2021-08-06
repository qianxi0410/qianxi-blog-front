import { AxiosPromise } from 'axios';
import { Comment } from '@/types/index';
import axios from '../axios/index';

export function saveComment(comment: Comment): AxiosPromise {
  return axios({
    url: `/comment/save`,
    method: 'POST',
    data: comment
  });
}

export function deleteComment(commentId: string): AxiosPromise {
  return axios({
    url: `/comment/${commentId}`,
    method: 'DELETE'
  });
}