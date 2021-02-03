import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import faker from 'faker';
import {
  PriceDeliveryAndStock,
  QuantityDropDown,
  AddToCartButton,
  BuyNowButton,
  AddToListDropdown,
  SecureTransactionAndSellerDetails
} from './CheckoutDetails.jsx';


const CheckoutWrapper = styled.div`
  width: 273px;
  max-width: 273px;
  border: 1px solid #D5D9D9;
  border-radius: 0px;
  padding: 14px 18px;
`;

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
    let productId = url.split('/')[3];
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
          <QuantityDropDown />
          <AddToCartButton />
          <BuyNowButton />
          <SecureTransactionAndSellerDetails />
        </div>
        :
        null
        }
        <AddToListDropdown />
      </CheckoutWrapper>
    );
  }
}