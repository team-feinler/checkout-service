import React, { useState } from 'react';
import styled from 'styled-components';
import faker from 'faker';

const AddToListDropDownWrapper = styled.div`
  background-color: #E7E9EC;
  border: 1px solid;
  border-color: #adb1b8 !important;
  font-family: "Amazon Ember",Arial,sans-serif;
  font-size: 13px;
  line-height: 29px;
  border: 1px solid;
  margin-top: 13px;
  height: 29px;
  border-radius: 3px;
  cursor: pointer;
`;

const AddToListSection = styled.span`
  width: 83%;
  display: inline-block;
  border-right: 1px solid;
  border-color: #adb1b8;
  height: 29px;
  padding-left: 5%;
`;

const DropDownArrowSection = styled.span`
  width: 13%;
  height: 29px;
`;

const DropDownArrowIcon = styled.i`
  position: absolute;
  margin: 10px 0 0 8px;
  height: 8px;
  width: 10px;
  background-image: url("https://m.media-amazon.com/images/S/sash/McBZv0ZvnbehkIx.png");
  background-position: -7px -102px;
`;

// const DropDown = styled.div`

// `;

const AddToListDropDown = (props) => {
  return <AddToListDropDownWrapper>
    <AddToListSection>Add to List</AddToListSection>
    <DropDownArrowSection><DropDownArrowIcon></DropDownArrowIcon></DropDownArrowSection>
  </AddToListDropDownWrapper>

};

export default AddToListDropDown;