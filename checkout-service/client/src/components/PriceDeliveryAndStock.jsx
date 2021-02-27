import React from 'react';
import styled from 'styled-components';

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
  cursor: pointer;
  &:hover{
    color: #C7511F;
    text-decoration: underline;
  }
`;

const BlueInlineText = styled(Text)`
  color: #007185;
  display: inline;
  cursor: pointer;
  &:hover{
    color: #C7511F;
    text-decoration: underline;
  }
`;

const Stock = styled.span`
  font-family: "Amazon Ember", Arial, sans-serif;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 10px;
`;

const smallerPadding = {
  lineHeight: "20px"
};


const PriceDeliveryAndStock = (props) => {

  let now = new Date();
  let night = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  let minTillMidnight = (night.getTime() - now.getTime()) / 1000 / 60;
  let hours = 0;
  for (let i = 0; i < 24; i++) {
    if (minTillMidnight >= 60) {
      minTillMidnight = minTillMidnight - 60;
      hours++;
    } else {
      break;
    }
  };

  return <div>

    <div style={{marginBottom: "10px"}}>
      <Price>{props.price === 'Price unavailable' ? 'Price unavailable' : `$${props.price}`}</Price>

      {props.isPrimeFreeOneDay && (
      <div>
        <img
          style={{width: "50px", height: "auto"}}
          src='https://m.media-amazon.com/images/G/01/AmazonServices/Site/US/Product/FBA/small-and-light-prime-logo._V509606070_.png'>
        </img>
        <GreyInlineText> FREE One-Day</GreyInlineText>
        <div>
          <InlineText>& </InlineText><BlueInlineText>FREE Returns &#8744;</BlueInlineText>
        </div>
      </div>
      )}

    </div>

    {props.isFreeDelivery || props.isPrimeFreeOneDay ?
    <div style={{marginBottom: "20px"}}>
      <Text style={smallerPadding}>FREE delivery: <strong>Tomorrow</strong></Text>
      <GreyText style={smallerPadding}>
        Order within {hours === 1 ? `${hours} hr and ${Math.round(minTillMidnight)} mins` : `${hours} hrs and ${Math.round(minTillMidnight)} mins`}
      </GreyText>
      <BlueText style={smallerPadding}>Details</BlueText>
    </div>
    :
    <div style={{marginBottom: "20px"}}>
      <Text style={smallerPadding}>
        Get it in {`${Math.floor(Number(props.price) / 10)} to ${Math.floor((Number(props.price) / 10) + 2)}`} days
      </Text>
      <GreyText style={smallerPadding}>
        Shipping & handling: ${`${Number(props.price) / 10}`.slice(0, 4)}
      </GreyText>
      <BlueText style={smallerPadding}>Details</BlueText>
    </div>
    }

    <Stock style={props.inventory ? {color: "#007600"} : {color: "#B12704"}}>{props.inventory ? "In Stock." : "Currently unavailble."}</Stock>
    {!props.inventory ? <Text style={{lineHeight: "20px"}}>We don't know when this item will be back in stock.</Text> : null}

  </div>
};

export default PriceDeliveryAndStock;

