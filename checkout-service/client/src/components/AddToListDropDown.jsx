import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Chance from 'chance';
const chance = new Chance();

const AddToListDropDownWrapper = styled.div`
  background-color: #E7E9EC;
  border: 1px solid !important;
  border-color: #adb1b8 !important;
  font-family: "Amazon Ember",Arial,sans-serif;
  font-size: 13px;
  line-height: 29px;
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
  width: 24px;
  height: 29px;
  border-radius: 0px 3px 3px 0px;
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
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    margin-top: 0.1em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  height: 29px;
  margin: 0.2em 0 0.2em 0;
  &:hover{
    background-color: #e2e5ea;
  }
`;

const ListItemImgWrapper = styled.span`
  height: 29px;
  margin: 0 8px 0 8px;
`;

const ListItemImg = styled.img`
  height: 22px;
  width: 30px;
`;

const ListItemTextWrapper = styled.div`
  height: 29px;
  display: inline-block;
`;

const ListItemLabel = styled.span`
  font-size: 12px;
  height: 14px;
  line-height: 14px;
  display: block;
`;

const ListItemStatus = styled.span`
  font-size: 12px;
  height: 14px;
  line-height: 14px;
  display: block;
  color: #565959;
`;

const generateListItems = () => {
  let randomNumOfLists = Math.floor(Math.random() * (5 - 1) + 1);
  let listStatus = ['public', 'private'];
  let listItems = [];
  for (let i = 0; i < randomNumOfLists; i++) {
    let randomPrivateOrPublicIndex = Math.floor(Math.random() * Math.floor(2));
    listItems.push(<ListItem key={uuidv4()}><ListItemImgWrapper><ListItemImg src={'https://placeimg.com/50/50'}></ListItemImg></ListItemImgWrapper><ListItemTextWrapper><ListItemLabel>{chance.word()}</ListItemLabel><ListItemStatus>{listStatus[randomPrivateOrPublicIndex]}</ListItemStatus></ListItemTextWrapper></ListItem>);
  };
  return listItems;
};

const generatedListItems = generateListItems();

const AddToListDropDown = (props) => {
  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = () => setDropDown(!dropDown);

  return <AddToListDropDownWrapper>
    <AddToListSection>
      Add to List
    </AddToListSection>
    <DropDownArrowSection onFocus={toggleDropDown} onBlur={toggleDropDown} tabIndex="0">
      <DropDownArrowIcon></DropDownArrowIcon>
    </DropDownArrowSection>
    {dropDown && (
      <DropDownListContainer>
        <DropDownList>
          {generatedListItems}
        </DropDownList>
      </DropDownListContainer>
    )}
  </AddToListDropDownWrapper>
};

export default AddToListDropDown;