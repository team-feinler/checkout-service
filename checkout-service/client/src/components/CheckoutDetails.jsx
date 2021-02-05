import React, { useState } from 'react';
import styled from 'styled-components';
import faker from 'faker';
import PriceDeliveryAndStock from '../components/PriceDeliveryAndStock.jsx';
import QuantityDropDown from '../components/QuantityDropDown.jsx';

const lineStyle = {
  borderTop: "1px solid #D5D9D9"
};

const AddToCartButton = (props) => (
  <div>
    <h2>AddToCartButton</h2>
  </div>
);

const BuyNowButton = (props) => (
  <div>
    <h2>BuyNowButton</h2>
  </div>
);

const SecureTransactionAndSellerDetails = (props) => (
  <div>
  <h2>SecureTransaction...</h2>
</div>
)

const AddToListDropdown = (props) => (
  <div style={lineStyle}>
    <h2>AddToListDropdown</h2>
  </div>
);


export {
  PriceDeliveryAndStock,
  QuantityDropDown,
  AddToCartButton,
  BuyNowButton,
  SecureTransactionAndSellerDetails,
  AddToListDropdown,
};