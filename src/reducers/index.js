import { combineReducers } from 'redux';
import FavReducer from './fav';

const rootReducer = combineReducers({
  fav: FavReducer,
});

export default rootReducer;
