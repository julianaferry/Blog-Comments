import {
    FETCH_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    ADD_COMMENT
  } from '../Actions/ActionCreator';
  
  export default function(state = [], action) {
    switch (action.type) {
      case FETCH_COMMENT:
        return {
          ...state,
          [action.payload.postId] : action.payload.payload
        };

      case UPDATE_COMMENT:
        return {
          ...state,
          [action.payload.parentId] : state[action.payload.parentId].map(
            comment =>
              action.payload.id === comment.id ? action.payload : comment
          )
        };

      case DELETE_COMMENT:
        return {
          ...state,
          [action.payload.parentId] : state[action.payload.parentId].filter(
            comment => action.payload.id !== comment.id
          )
        };

      case ADD_COMMENT:
        return {
          ...state,
          [action.payload.parentId] : [
            ...state[action.payload.parentId],
            action.payload
          ]
        };
      default:
        return state;
    }
  }