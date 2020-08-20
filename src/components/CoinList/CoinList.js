import React from 'react';
import Coin from '../Coin/Coin';
import Table from 'react-bootstrap/Table'

const CoinList = ({ data, handleDelete }) => {
  return(
    <Table responsive="sm">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Symbol</th>
          <th>Price (USD)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          data.length > 0 ? data.map((item) => {
            return (
              <Coin key={item.id} item={item} handleDelete={handleDelete}/>         
            );
          }): ''
        }
      </tbody>
    </Table>  
  )
};

export default CoinList;