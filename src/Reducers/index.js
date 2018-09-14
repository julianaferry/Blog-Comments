import { combineReducers } from 'redux';
import post from './PostReducer';
import category from './CategoryReducer';
import comment from './CommentReducer';
import order from './OrderReducer';


export default combineReducers({
  posts: post,
  categories: category,
  comments: comment,
  order: order
});