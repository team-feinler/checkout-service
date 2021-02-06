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
  &:hover {
    background-color: #e2e5ea;
  }
`;

const DropDownArrowSection = styled.span`
  position: absolute;
  width: 26px;
  height: 29px;
  &:hover {
    background-color: #e2e5ea;
  };
  &:focus {
    box-shadow: 0 0 3px 2px rgb(228 121 17 / 50%);
    outline: 0;
  };
`;

const DropDownArrowIcon = styled.i`
  position: absolute;
  margin: 10px 0 0 8px;
  height: 8px;
  width: 10px;
  background-image: url("https://m.media-amazon.com/images/S/sash/McBZv0ZvnbehkIx.png");
  background-position: -7px -102px;
  border: none;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    margin-top: 0.1em;
    /* padding-top: 0.8em; */
  }
`;

const ListItem = styled("li")`
  list-style: none;
  /* margin-bottom: 0.8em; */
  height: 29px;
  border: 1px solid black;
`;

const AddToListDropDown = (props) => {
  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = () => setDropDown(!dropDown);

  return <AddToListDropDownWrapper>
    <AddToListSection>Add to List</AddToListSection>
    <DropDownArrowSection onFocus={toggleDropDown} onBlur={toggleDropDown} tabIndex="0"><DropDownArrowIcon></DropDownArrowIcon></DropDownArrowSection>
    {dropDown && (
      <DropDownListContainer>
        <DropDownList>
          <ListItem>Mangoes</ListItem>
          <ListItem>Apples</ListItem>
          <ListItem>Oranges</ListItem>
        </DropDownList>
      </DropDownListContainer>
    )}
  </AddToListDropDownWrapper>

};

export default AddToListDropDown;