import React from 'react';
import styled from 'styled-components';
import faker from 'faker';

const Text = styled.span`
  font-family: "Amazon Ember",Arial,sans-serif;
  font-size: 14px;
  display: block;
  line-height: 24px;
`;

const InlineText = styled(Text)`
  display: inline;
`;

const Price = styled(Text)`
  font-size: 18px;
  color: #B12704;
`;

const GreyText = styled(Text)`
  color: #565959;
`;

const GreyInlineText = styled(Text)`
  color: #565959;
  display: inline;
`;

const BlueText = styled(Text)`
  color: #007185;
`;

const BlueInlineText = styled(Text)`
  color: #007185;
  display: inline;
`;

// const div style = styled.div`
//   margin-bottom: 10px;
// `;



const Stock = styled.span`
  font-family: "Amazon Ember", Arial, sans-serif;
  /* color: ${props => props.inventory ? "#007600" : "#B12704"}; */
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 10px;
`;

const smallerPadding = {
  lineHeight: "20px"
};

const lineStyle = {
  borderTop: "1px solid #D5D9D9"
}


const PriceDeliveryAndStock = (props) => (
  <div>
    <div style={{marginBottom: "10px"}}>
      <Price>${props.price}</Price>
      <img style={{width: "50px", height: "auto"}} src='https://m.media-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/small-and-light-prime-logo._V509606070_.png'></img><GreyInlineText> FREE One-Day</GreyInlineText>
      <div>
        <InlineText>& </InlineText><BlueInlineText>FREE Returns <sup>&#8744;</sup></BlueInlineText>
      </div>
    </div>
    <div style={{marginBottom: "20px"}}>
      <Text style={smallerPadding}>FREE delivery: <strong>Tomorrow</strong></Text>
      <GreyText style={smallerPadding}>Order within 'hours remaining'</GreyText>
      <BlueText style={smallerPadding}>Details</BlueText>
    </div>
    <Stock style={props.inventory ? {color: "#007600"} : {color: "#B12704"}}>{props.inventory ? "In Stock." : "Currently unavailble."}</Stock>
    {!props.inventory ? <Text style={{lineHeight: "20px"}}>We don't know when this item will be back in stock.</Text> : null}
  </div>
);

const QuantityDropDown = (props) => (
  <div>
    <h2>QuantityDropDown</h2>
  </div>
);

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