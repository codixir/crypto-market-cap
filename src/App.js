import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CoinList from './components/CoinList/CoinList';
import CoinsListControls from './components/CoinsListControls/CoinsListControls';
import { fetchAllCoins } from './store/coins/actions';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import './App.css';

function App() {
  const [tableData, setData] = useState([]);
  const [limit] = useState(10);
  const [dropdownData, setDropdownData] = useState([]);
  const [currentCoinId, setCurrentCoinId] = useState(0);
  const [sortBy, setSortBy] = useState('cmc_rank');

  //The following come from the redux store ----------------
  const coins = useSelector(state => state.coins.coins);
  const error = useSelector(state => state.coins.error);
  const isLoading = useSelector(state => state.coins.isLoading);
  //--------------------------------------------------------

  const dispatch = useDispatch();

  //Adds a coin from the dropdown to the table
  const handleAddCoin = (e) => {       
    let id = e.target.value;
    if (id !== "-1") {     
      const currentCoin = dropdownData.filter((item) => item.id === Number(id))[0];
      const newDropDownData = dropdownData.filter((item) => item.id !== Number(id));

      setDropdownData(newDropDownData);

      const newData = [...tableData, currentCoin];
      setData(newData);      
    }
  };

  //Sorts the table
  const handleSort = (e) => {
    let value = e.target.value;
    
    if (value !== '-1') {
      setSortBy(value);      
    }
  };

  //Deletes a row from the table
  const handleDelete = (e, id) => {
    if (tableData.length > 1) {
      const item  = tableData.filter((item) => {
        return item.id === id;
      })[0];
  
      const newData  = tableData.filter((item) => {
        return item.id !== id;
      });
      setData(newData);
  
      const newDrodownData = [...dropdownData, item];
      setDropdownData(newDrodownData);
    }
  };

  //Here we do two types of sorting.
  //If sorting by price, we do client side sort only. And that is because
  //the api is not able to sort by `price`.
  //But if sorting by rank, since the api accepts `cmc_rank` as value of the 
  //sort queryParam, we let the backend do the sorting and just render the response.

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

  //Here the 10 coins are split into two arrays, 
  //where the first one will hold the first five coins
  //that will be rendered on the table and the second one
  //will hold the coins that will be placed in the dropdown

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
        handleChange={handleAddCoin} 
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
