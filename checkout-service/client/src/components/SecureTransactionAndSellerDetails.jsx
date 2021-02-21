import React, { useState } from 'react';
import styled from 'styled-components';
import faker from 'faker';

const SecureTransactionAndSellerDetailsWrapper = styled.div`
  margin-top: 15px;
`;

const Text = styled.span`
  font-family: "Amazon Ember", Arial, sans-serif;
`;

const SecureTransactionText = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  text-transform: normal;
  color: #007185;
  margin-left: 15px;
  cursor: pointer;
  &:hover{
    color: #C7511F;
  }
`;

const SellerDetailsTitle = styled(Text)`
  font-size: 12px;
  color: #565959;
  white-space: nowrap;
`;

const SellerDetails = styled(Text)`
  font-size: 12px;
  color: #0F1111;
  margin-left: 10px;
  max-width: 140px;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const SecureTransactionPopover = styled.div`
  position: absolute;
  margin-top: 12px;
  margin-left: -15%;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  width: 384px;
  height: auto;
  padding-left: 10px;
  background: white;
  z-index: 1000;
  cursor: default;
`;

const PopoverBoldText = styled(Text)`
  display: block;
  font-size: 14px;
  font-weight: 700;
  padding-left: 5%;
`;

const RegularText = styled(Text)`
  display: block;
  font-size: 14px;
  padding: 1em 5% 2em 5%;
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

const X = styled(Text)`
  display: block;
  margin-left: 95%;
  margin-top: .3em;
  cursor: pointer;
`;

let sellerDetails = {sellerDetail: faker.company.companyName(), sellerDetailTitle: faker.company.companyName()};

const SecureTransactionAndSellerDetails = (props) => {
  const [popover, setPopover] = useState(false);
  const togglePopover = () => setPopover(!popover);

  return <div>
    <SecureTransactionAndSellerDetailsWrapper>
    <img onClick={() => togglePopover()} style={{height: "15px", verticalAlign: "top", cursor: "pointer"}} src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/checkout/truespc/secured-ssl._CB485936932_.png"></img>
    <SecureTransactionText onClick={() => togglePopover()}>Secure Transaction</SecureTransactionText>
    {popover && (
    <SecureTransactionPopover>
      <X onClick={() => togglePopover()}>x</X>
      <PopoverBoldText>Your transaction is secure</PopoverBoldText>
      <RegularText>We work hard to protect your security and privacy. Our payment security system encrypts your information during transmission. We don’t share your credit card details with third-party sellers, and we don’t sell your information to others. <BlueInlineText>Learn more</BlueInlineText></RegularText>
    </SecureTransactionPopover>
    )}
    <table style={{marginTop: "8px"}}>
      <tbody>
        <tr>
          <td>
            <SellerDetailsTitle>Ships from</SellerDetailsTitle>
          </td>
          <td>
            <SellerDetails>{sellerDetails.sellerDetail}</SellerDetails>
          </td>
        </tr>
        <tr>
          <td>
            <SellerDetailsTitle>Sold By</SellerDetailsTitle>
          </td>
          <td>
            <SellerDetails>{sellerDetails.sellerDetailTitle}</SellerDetails>
          </td>
        </tr>
      </tbody>
    </table>
    </SecureTransactionAndSellerDetailsWrapper>
    </div>
}

export default SecureTransactionAndSellerDetails;