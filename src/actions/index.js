import { FETCH_FAV_LIST } from '../constants';
import favListJSON from '../data/favlist.json';

export const fetchFavList = () => {
  return {
    type: FETCH_FAV_LIST,
    payload: favListJSON,
  };
}
