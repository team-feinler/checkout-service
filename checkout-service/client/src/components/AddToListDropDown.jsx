import React, { useState } from 'react';
import styled from 'styled-components';

const AddToListDropDownWrapper = styled.div`
  border: 1px solid black;
  font-family: "Amazon Ember",Arial,sans-serif;
  font-size: 13px;
  line-height: 29px;
  border: 1px solid;
  margin-top: 13px;
  height: 29px;
  border-radius: 3px;
  cursor: pointer;
`;

const AddToListDropDown = (props) => {
  return <AddToListDropDownWrapper></AddToListDropDownWrapper>
};

export default AddToListDropDown;