import { combineReducers } from 'redux';
import { coins } from './coins/reducers';

export const rootReducer = combineReducers({
  coins,
});