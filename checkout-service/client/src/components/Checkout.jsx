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
  width: 242px;
  max-width: 242px;
  border: 1px solid #D5D9D9;
  border-radius: 8px;
  padding: 14px 18px;
`;

export default class Checkout extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      productId: 1001,
      price: null,
      inventory: null
    };
  }


  componentDidMount() {
    fetch(`http://localhost:4003/priceandinventory/id/${this.state.productId}`)
    .then((res) => res.json())
    .then((res) => {
      // console.log('price: ', res[0].price, 'inventory: ', res[0].inventory);
      let productPrice = res[0].price;
      let productInventory = res[0].inventory;
      this.setState({
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