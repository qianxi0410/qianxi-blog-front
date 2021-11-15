import { AxiosPromise } from 'axios';
import { Comment, Response } from '@/types/index';
import axios from '../axios/index';

export function saveComment(comment: Comment): AxiosPromise<Response<number>> {
  return axios({
    url: `/comment/save`,
    method: 'POST',
    data: comment
  });
}

export function deleteComment(
  commentId: number,
  login: string
): AxiosPromise<Response<null>> {
  return axios({
    url: `/comment/id/${commentId}/login/${login}`,
    method: 'DELETE'
  });
}
