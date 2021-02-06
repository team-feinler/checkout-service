import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import faker from 'faker';
import fetch from 'node-fetch';
import PriceDeliveryAndStock from '../components/PriceDeliveryAndStock.jsx';
import QuantityDropDown from '../components/QuantityDropDown.jsx';
import { AddToCartButton, BuyNowButton } from '../components/Buttons.jsx';
import SecureTransactionAndSellerDetails from '../components/SecureTransactionAndSellerDetails.jsx';
import AddToListDropDown from '../components/AddToListDropDown.jsx';

const CheckoutWrapper = styled.div`
  width: 235px;
  max-width: 235px;
  border: 1px solid #D5D9D9;
  border-radius: 0px;
  padding: 14px 18px;
`;

const lineStyle = {
  margin: "10px 0 10px 0",
  borderTop: "1px solid #D5D9D9"
};

const Line = (props) => (
  <div style={lineStyle}></div>
)


export default class Checkout extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      productId: null,
      price: null,
      inventory: null
    };
  }

  componentDidMount() {
    let url = window.location.href;
    let productId = url.split('/')[3] || 1000;
    fetch(`http://localhost:4003/priceandinventory/id/${productId}`)
    .then((res) => res.json())
    .then((res) => {
      let productPrice = res[0].price;
      let productInventory = res[0].inventory;
      this.setState({
        productId: productId,
        price: productPrice,
        inventory: productInventory
      });
    })
  }

  render () {

    let propsToPass = { price: this.state.price, inventory: this.state.inventory }

    return (
      <CheckoutWrapper style={this.state.inventory ? {height: "655px"} : {height: "auto"}}>
        <PriceDeliveryAndStock {...propsToPass} />
        {this.state.inventory ?
        <div>
          <QuantityDropDown inventory={this.state.inventory}/>
          <AddToCartButton />
          <BuyNowButton />
          <SecureTransactionAndSellerDetails />
        </div>
        :
        null
        }
        <Line />
        <AddToListDropDown />
      </CheckoutWrapper>
    );
  }
}