import { FETCH_CATEGORIES } from '../Actions/ActionCreator';
import { Category } from '../Utils/Category';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return [Category, ...action.payload.categories];
    default:
      return state;
  }
}