import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  font-family: "Amazon Ember",Arial,sans-serif;
  font-size: 13px;
  line-height: 29px;
  border: 1px solid;
  margin-top: 13px;
  height: 29px;
  border-radius: 3px;
  cursor: pointer;
`;

const Icon = styled.i`
    position: absolute;
    height: 25px;
    width: 25px;
    margin-top: 2px;
    margin-left: 2px;
`;

const ButtonText = styled.span`
  display: block;
  text-align: center;
`;

const AddToCartBtnWrapper = styled(ButtonWrapper)`
  background: #f0c14b;
  border-color: #a88734 #9c7e31 #846a29;
  &:hover {
    border-color: #a88734 #9c7e31 #846a29;
    background: rgb(224,180,69);
    background: linear-gradient(0deg, rgba(224,180,69,1) 0%, rgba(240,193,75,1) 100%);
  }
`;

const AddtoCartBtnIcon = styled(Icon)`
  background-image: url("https://m.media-amazon.com/images/S/sash/McBZv0ZvnbehkIx.png");
  background-position: -35px -5px;
`;

const AddToCartButton = (props) => (
  <AddToCartBtnWrapper>
    <AddtoCartBtnIcon></AddtoCartBtnIcon>
    <ButtonText>Add to Cart</ButtonText>
  </AddToCartBtnWrapper>
);


const BuyNowBtnWrapper = styled(ButtonWrapper)`
  margin-top: 10px;
  background: #ed9220;
  border-color: #ca7c1b #be751a #a56616;
  &:hover {
    border-color: #a88734 #9c7e31 #846a29;
    background: rgb(223,138,30);
    background: linear-gradient(0deg, rgba(223,138,30,1) 0%, rgba(237,146,32,1) 100%);
  }
`;

const BuyNowBtnIcon = styled(Icon)`
  background-image: url("https://m.media-amazon.com/images/S/sash/McBZv0ZvnbehkIx.png");
  background-position: -35px -60px;
`;

const BuyNowButton = (props) => (
  <BuyNowBtnWrapper>
    <BuyNowBtnIcon></BuyNowBtnIcon>
    <ButtonText>Buy Now</ButtonText>
  </BuyNowBtnWrapper>
);

export { AddToCartButton, BuyNowButton };