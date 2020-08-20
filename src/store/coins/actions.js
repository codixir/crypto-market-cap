import { 
  FETCH_ALL_COINS_SUCCESS, 
  FETCH_ALL_COINS_LOADING, 
  FETCH_ALL_COINS_ERROR } from './types';
import API from '../../services/api';
import { sort } from '../../helpers/sort';

const api = new API();

export function fetchCoins(type, payload) {
  return {
    type,
    payload,
  };
}

async function getCoinDetails (id) {
  const url = `/coinmarketcap/quotes`;
  try {
    const response = await api.makeRequest({
      method: 'GET',
      url: url,
      queryParams: {
        id: id,
      }
    });
    return response;
  } catch (e) {
    console.log(e);
  }  
};

const tarnsformCoinsResponse = async (data, payloadArray) => {
  for (const item of data) {
    let payloadItem = {};   
    let coinDetails = (await getCoinDetails(item.id)).data.data[item.id];
    
    payloadItem.id = item.id;          
    payloadItem.symbol = item.symbol;          
    payloadItem.rank = coinDetails.cmc_rank;
    payloadItem.price = coinDetails.quote.USD.price;

    const filteredItems = payloadArray.filter((obj) => {
      return payloadItem.id === obj.id;
    });

    if (!filteredItems.length) {            
      payloadArray.push(payloadItem);
    }        
  }
  
  return payloadArray;
}

export function fetchAllCoins(url, queryParams) {   
  let sortrOrder = 'asc'
  let isLoading = true;

  return async (disaptch) => {     
    disaptch(fetchCoins(FETCH_ALL_COINS_LOADING, isLoading));
    try {      
      const response = await api.makeRequest({
        method: 'GET',
        url: url,
        queryParams: queryParams,
      });
      
      if (response && response.data && Array.isArray(response.data.data)) {                      
        try {
          const coins = await tarnsformCoinsResponse(response.data.data, []);
 
          if (!queryParams.sort) {
            sort(coins, 'price', sortrOrder);
          }

          isLoading = false;          
          disaptch(fetchCoins(FETCH_ALL_COINS_LOADING, isLoading));
          disaptch(fetchCoins(FETCH_ALL_COINS_SUCCESS, coins));
        } catch (e) {
          isLoading = false;      
          disaptch(fetchCoins(FETCH_ALL_COINS_LOADING, isLoading));
          disaptch(fetchCoins(FETCH_ALL_COINS_ERROR, e.message ? e.message: 
            'There has been an error'));
        }        
      }
    } catch(e) {
      isLoading = false;          
      disaptch(fetchCoins(FETCH_ALL_COINS_LOADING, isLoading));
      disaptch(fetchCoins(FETCH_ALL_COINS_ERROR, e.message ? e.message: 
        'There has been an error'));
    }  

    return 'done';
  }
}