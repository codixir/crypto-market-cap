import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CoinList from './components/CoinList/CoinList';
import CoinsListControls from './components/CoinsListControls/CoinsListControls';
import { fetchAllCoins } from './store/coins/actions';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [limit] = useState(10);
  const [dropdownData, setDropdownData] = useState([]);
  const [currentCoinId, setCurrentCoinId] = useState(0);
  const [sortBy, setSortBy] = useState('cmc_rank');
  const coins = useSelector(state => state.coins.coins);
  const isLoading = useSelector(state => state.coins.isLoading);
  const error = useSelector(state => state.coins.error);
  const dispatch = useDispatch();

  const handleChange = (e) => {       
    let id = e.target.value;
    if (id !== "-1") {     
      const currentCoin = dropdownData.filter((item) => item.id === Number(id))[0];
      const newDropDownData = dropdownData.filter((item) => item.id !== Number(id));

      setDropdownData(newDropDownData);

      const newData = [...data, currentCoin];
      setData(newData);      
    }
  };

  const handleSort = (e) => {
    let value = e.target.value;
    
    if (value !== '-1') {
      setSortBy(value);      
    }
  };

  const handleDelete = (e, id) => {
    if (data.length > 1) {
      const item  = data.filter((item) => {
        return item.id === id;
      })[0];
  
      const newData  = data.filter((item) => {
        return item.id !== id;
      });
      setData(newData);
  
      const newDrodownData = [...dropdownData, item];
      setDropdownData(newDrodownData);
    }
  };

  useEffect(() => {  
    const url = `/coinmarketcap/map`
    let queryParams = {};

    if (sortBy.length && sortBy !== 'price') {
      queryParams = { limit: limit, sort: sortBy};
    } else {
      queryParams = { limit: limit};
    }

    dispatch(fetchAllCoins(url, queryParams));        
  }, [dispatch, limit, sortBy]);

  useEffect(() => {
    const initialCoins  = coins.filter((item, index) => {
      return index < 5;
    });
    
    setData(initialCoins);

    const dropdownCoins  = coins.filter((item, index) => {
      return index >= 5 && index < limit;
    });

    if (dropdownCoins.length) {
      setCurrentCoinId(dropdownCoins[0].id);
      setDropdownData(dropdownCoins);
    }      
  }, [limit ,coins]);
  
  return (
    <div className="App">
      <CoinsListControls 
        dropdownData={dropdownData} 
        handleChange={handleChange} 
        handleSort={handleSort}
      />

      <div className="content-section">
        { 
          isLoading ? 
          <div className="loading-container">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>: ( 
            error? <Alert variant='danger'>{error}</Alert>: 
          <CoinList data={data} handleDelete={handleDelete}/> )                   
        }
      </div>      
    </div>
  );
}

export default App;
