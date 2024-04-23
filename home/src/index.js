import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cart from './components/Cart/Cart';
import Shop from './components/Shop/Shop';

export default function App1() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<App />} />
          <Route path="/shop" element={<Shop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Auth0Provider
    domain="dev-3n2lx343e23m1mwb.us.auth0.com"
    clientId="cauIXkuxr15Y2YoOCkjNoZaCfPcB8t36"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App1 />
  </Auth0Provider>,
  document.getElementById('root')
);
