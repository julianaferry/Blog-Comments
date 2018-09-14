import { UPDATE_ORDER } from './ActionCreator';

export const orderBy = newOrder => dispatch =>
  dispatch({
    type: UPDATE_ORDER,
    value: newOrder
  });