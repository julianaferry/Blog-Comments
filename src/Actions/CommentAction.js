import { helper } from '../Utils/Helper';
import * as Api from '../Utils/Api';
import {
    FETCH_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    ADD_COMMENT
  }  from './ActionCreator';

  export const fetchComments = postId => dispatch =>
  Api.getPostComments(postId).then(payload =>
    dispatch(helper(FETCH_COMMENT, { postId, payload }))
  );

export const voteComment = (id, option) => dispatch =>
  Api.voteComment(id, option).then(payload =>
    dispatch(helper(UPDATE_COMMENT, payload))
  );

export const deleteComment = comment => dispatch =>
  Api.deleteComment(comment.id).then(res => {
    dispatch({
      type: DELETE_COMMENT,
      payload: comment
    });
  });

export const addComment = comment => dispatch =>
  Api.addComment(comment).then(res => {
    dispatch({
      type: ADD_COMMENT,
      payload: res
    });
  });

export const updateComment = comment => dispatch =>
  Api.editComment(comment).then(payload =>
    dispatch(helper(UPDATE_COMMENT, payload))
  );