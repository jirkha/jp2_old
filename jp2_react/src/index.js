import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from "./components/Store/store"
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';
import { HashRouter as Router } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-t55ss4yu37cuhrj2.us.auth0.com"
    clientId="pG7rKl6PrwIkwF5bryoTXB2rKLTw3tvU"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  </Auth0Provider>
);

