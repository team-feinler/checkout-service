import styled from 'styled-components';

// PriceDeliveryAndStock
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

// QuantityDropDown


export {
  Text,
  InlineText,
  Price,
  GreyText,
  GreyInlineText,
  BlueText,
  BlueInlineText,
  Stock,
  smallerPadding,
  lineStyle
}