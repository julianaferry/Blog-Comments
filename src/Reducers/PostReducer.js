import {
    FETCH_POST,
    DELETE_POST,
    UPDATE_POST,
    DELETE_COMMENT,
    ADD_COMMENT,
    ADD_POST
  } from '../Actions/ActionCreator';
  
  export default function(state = [], action) {
    switch (action.type) {
      case ADD_POST:
        return [...state, action.payload];
  
      case FETCH_POST:
        return [...action.payload];
  
      case DELETE_POST:
        return state.filter (post => post.id !== action.value.id);
  
      case UPDATE_POST:
        return state.map (
          post => (action.payload.id === post.id ? action.payload : post)
        );
  
      case DELETE_COMMENT:
        return state.map (post => {
          if (action.payload.parentId === post.id) {
            post.commentCount = post.commentCount - 1;
            return post;
          } else {
            return post;
          }
        });
  
      case ADD_COMMENT:
        return state.map (post => {
          if (action.payload.parentId === post.id) {
            post.commentCount = post.commentCount + 1;
            return post;
          } else {
            return post;
          }
        });
        
      default:
        return state;
    }
  }