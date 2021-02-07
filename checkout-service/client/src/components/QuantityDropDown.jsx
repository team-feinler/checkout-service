import React, { useState } from 'react';
import styled from 'styled-components';

const QtyButton = styled.div`
margin-top: 10px;
height: 20px;
width: 61px;
border: 1px solid black;
line-height: 20px;
border-radius: 8px;
border-color: #D5D9D9;
background: #F0F2F2;
border-style: solid;
border-width: 1px;
box-shadow: 0 2px 5px rgb(15 17 17 / 15%);
cursor: pointer;
&:hover {
  background: #e7e9ec;
}`;

const QtyButtonText = styled.span`
font-family: "Amazon Ember",Arial,sans-serif;
font-size: 11.5px;
padding-left: 6px;
&:hover {

}`;

const QtyDropDownWrapper = styled.div`
width: 61px;
margin: 0 auto;
position: absolute;
cursor: pointer;
z-index: 1000;
`;

const QtyDropDownList = styled.ul`
padding: 0;
margin: 0;
background: #ffffff;
border: 2px solid #e5e5e5;
box-sizing: border-box;
font-size: 1.3rem;
font-weight: 500;
border-radius: 0 0 5px 5px;
&:first-child {
  padding-top: 0.2em;
  border-top-style: none;
}`;

const QtyDropDownListItem = styled.li`
font-family: "Amazon Ember",Arial,sans-serif;
font-size: 14px;
list-style: none;
height: 25px;
padding-left: .8em;
&:hover {
  background-color: #F0F2F2 !important;
}`;

const firstItemStyle = {
borderTopStyle: "solid",
borderBottomStyle: "none",
height: "34px",
width: "61px",
paddingTop: "0.5em",
marginTop: "10px",
borderRadius: "5px 5px 0 0"
};

const selectedQtyStyle = {
backgroundColor: "#EDFDFF"
};


const QuantityDropDown = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [dropDown, setDropDown] = useState(false);

  const renderQtyNumbers = () => {
    let maxDropDownNumber = props.inventory > 6 ? 6 : props.inventory;
    let qtyNumbersElements = [];
      for (let i = 0; i < maxDropDownNumber; i++) {
        qtyNumbersElements.push(<QtyDropDownListItem style={quantity == i + 2 ? selectedQtyStyle : null} onClick={(e) => {setDropDown(false); setQuantity(e.target.innerHTML)}} key={i + 2}>{i + 2}</QtyDropDownListItem>)
      }
      return qtyNumbersElements;
  }

  let button = <div style={{height: "34px"}}><QtyButton onClick={() => setDropDown(true)}>
        <QtyButtonText>
          Qty:  {quantity} <span style={{marginLeft: "2px"}}>&#8744;</span>
        </QtyButtonText>
    </QtyButton></div>

  let dropDownElement = <div>
    <QtyDropDownList style={firstItemStyle} onClick={(e) => {setDropDown(false); setQuantity(e.target.innerHTML)}}>
        <QtyDropDownListItem style={quantity == 1 ? selectedQtyStyle : null}>1</QtyDropDownListItem>
    </QtyDropDownList>

    <QtyDropDownWrapper>
        <QtyDropDownList>
          {renderQtyNumbers()}
        </QtyDropDownList>
    </QtyDropDownWrapper>
  </div>

  if (!dropDown) {
    return button;
  } else {
    return dropDownElement;
  }
};

export default QuantityDropDown;