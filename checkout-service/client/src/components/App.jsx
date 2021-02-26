import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// import fetch from 'node-fetch';
import fetchWithTimeout from '../fetchWithTimeout.js';
import PriceDeliveryAndStock from '../components/PriceDeliveryAndStock.jsx';
import QuantityDropDown from '../components/QuantityDropDown.jsx';
import { AddToCartButton, BuyNowButton } from '../components/Buttons.jsx';
import SecureTransactionAndSellerDetails from '../components/SecureTransactionAndSellerDetails.jsx';
import AddToListDropDown from '../components/AddToListDropDown.jsx';

const CheckoutWrapper = styled.div`
  width: 215px;
  max-width: 215px;
  border: 1px solid #D5D9D9;
  border-radius: 8px;
  padding: 14px 18px;
`;

const Line = styled.div`
  margin: 10px 0 10px 0;
  border-top: 1px solid #D5D9D9;
`;

export default class Checkout extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      productId: null,
      price: null,
      inventory: null,
      delivery: {},
      seller: null,
    };
  }

  async getPriceAndInventory(productId) {
    try {
      const response = await fetchWithTimeout(`http://ec2-3-141-67-137.us-east-2.compute.amazonaws.com:4003/priceandinventory/id/${productId}`, {
        timeout: 3000
      });
      const parsedResponse = await response.json();
      let productPrice = parsedResponse[0].price;
      let productInventory = parsedResponse[0].inventory;
      this.setState({
        productId: productId,
        price: `$${productPrice}`,
        inventory: productInventory
      });
    } catch (e) {
      this.setState({
        productId: productId,
        price: 'Price unavailable',
        inventory: 0
      });
    };
  }

  // http://ec2-18-217-85-161.us-east-2.compute.amazonaws.com:4004/description/${productId}`

  async getSellerDetails(productId) {
    try {
      const response = await fetchWithTimeout(`http://localhost:4004/description/${productId}`, {
        timeout: 3000
      });
      const parsedResponse = await response.json();
      let rawItemInfo = parsedResponse[0];
      let seller = `${rawItemInfo.brand}.com Services LLC`
      let delivery = {
        isFreeDelivery: rawItemInfo.isFreeDelivery,
        isPrimeFreeOneDay: rawItemInfo.isPrimeFreeOneDay
      };
      console.log(seller, delivery);
      this.setState({
        delivery: delivery,
        seller: seller
      });
    } catch (e) {
      let seller = 'N/A';
      let delivery = {
        isFreeDelivery: false,
        isPrimeFreeOneDay: false
      };
      this.setState({
        delivery: delivery,
        seller: seller
      });
    }
  }

  componentDidMount() {
    let url = window.location.href;
    let productId = url.split('/')[3] || 1000;
    this.getPriceAndInventory(productId);
    this.getSellerDetails(productId);
  }

  render () {
    let priceAndInventoryProps = {
      price: this.state.price,
      inventory: this.state.inventory
    };
    let PrimeDeliveryAndSellerProps = {
      seller: this.state.seller,
      isPrimeFreeOneDay: this.state.isPrimeFreeOneDay,
      isFreeDelivery: this.state.isFreeDelivery
    };

    return (
      <CheckoutWrapper>
        <PriceDeliveryAndStock { ...priceAndInventoryProps } />
        {this.state.inventory ?
        <div>
          <QuantityDropDown inventory={ this.state.inventory }/>
          <AddToCartButton />
          <BuyNowButton />
          <SecureTransactionAndSellerDetails { ...PrimeDeliveryAndSellerProps } />
        </div>
        :
        null
        }
        <Line></Line>
        <AddToListDropDown />
      </CheckoutWrapper>
    );
  }
}