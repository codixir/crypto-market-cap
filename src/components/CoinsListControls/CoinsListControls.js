import React from 'react';
import Form from 'react-bootstrap/Form';
import './CoinsListControls.css';

const CoinsListControls = ({dropdownData, handleChange, handleSort}) => {
  return (
    <Form className="coin-controls">
      <Form.Group controlId="CoinSelect1" className="coin-select">
        <Form.Control as="select" onChange={handleChange}>
          <option value="-1">Select a coin</option>
          {dropdownData.map((opt) => {
            return <option key={opt.id} value={opt.id}>{opt.symbol}</option>;
          })}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="SortSelect2" className="sort-select">
        <Form.Control as="select" onChange={handleSort}>
          <option value="-1">Sort By</option>
          <option value="cmc_rank">Rank</option>
          <option value="price">Price</option>
        </Form.Control>
      </Form.Group>      
    </Form>
  )
}

export default CoinsListControls;