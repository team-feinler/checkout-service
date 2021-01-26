import React from "react";
import ReactDOM from 'react-dom';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

// import { configure } from "enzyme";
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// configure({ adapter: new Adapter() });

import App from './client/src/components/App.jsx';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders App component", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.textContent).toBe('Goodbye World!');
});