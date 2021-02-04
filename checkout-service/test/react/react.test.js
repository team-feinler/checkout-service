import React from "react";
import ReactDOM from 'react-dom';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Enzyme, { shallow, configure, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import Checkout from '../../client/src/components/Checkout.jsx';
import { PriceDeliveryAndStock } from '../../client/src/components/CheckoutDetails.jsx';

describe("Checkout component", () => {
  test("renders", () => {
    const wrapper = shallow(<Checkout />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe("Checkout PriceDeliveryAndStock component", () => {
  test("renders", () => {
    const wrapper = shallow(<PriceDeliveryAndStock />);
    expect(wrapper.exists()).toBe(true);
  });

  test("renders passed price prop", () => {
    const wrapper = mount(<PriceDeliveryAndStock />);

    wrapper.setProps({price: 18.99});
    expect(wrapper.contains('18.99')).toEqual(true);
  });

  test("renders in stock text if inventory greater than 0", () => {
    const wrapper = mount(<PriceDeliveryAndStock />);

    wrapper.setProps({inventory: 10});
    expect(wrapper.contains('In Stock.')).toEqual(true);
    expect(wrapper.contains('Currently unavailble.')).toEqual(false);
  });

  test("renders currently unavalable text if inventory is equal to 0", () => {
    const wrapper = mount(<PriceDeliveryAndStock />);

    wrapper.setProps({inventory: 0});
    expect(wrapper.contains('Currently unavailble.')).toEqual(true);
    expect(wrapper.contains('In Stock.')).toEqual(false);
  });

});