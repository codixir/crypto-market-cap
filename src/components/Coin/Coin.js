import React from 'react';
import Button from 'react-bootstrap/Button'

const Coin = ({item, handleDelete}) => {
  return (
    <tr key={item.id}>
      <td>{item.rank}</td>
      <td>{item.symbol}</td>
      <td>{item.price}</td>
      <td>
        <Button variant="danger" onClick={(e) => {handleDelete(e, item.id)}}>Delete</Button>
      </td>
    </tr>
  )
};

export default Coin;