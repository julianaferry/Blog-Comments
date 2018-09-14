import { UPDATE_ORDER } from '../Actions/ActionCreator';
import { VOTE_ORDER } from '../Utils/Constants';

export default function(state = VOTE_ORDER, action) {
  switch (action.type) {
    case UPDATE_ORDER:
      return action.value;
    default:
      return state;
  }
}