import { 
  FETCH_ALL_COINS_SUCCESS, 
  FETCH_ALL_COINS_LOADING, 
  FETCH_ALL_COINS_ERROR } from './types';

const initialState = {
  coins: [],
  error: '',
  isLoading: false,
};

export const coins = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_ALL_COINS_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_ALL_COINS_ERROR:
      return { ...state, error: action.payload };
    case FETCH_ALL_COINS_SUCCESS: 
      return { ...state, coins: [...action.payload] };
    default:
      return state;
  }
};

