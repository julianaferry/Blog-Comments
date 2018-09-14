import { helper } from '../Utils/Helper';
import * as Api from '../Utils/Api';
import { FETCH_CATEGORIES } from './ActionCreator';

export const fetchCategories = () => dispatch =>
  Api.getCategories().then(payload =>
    dispatch(helper(FETCH_CATEGORIES, payload))
  );