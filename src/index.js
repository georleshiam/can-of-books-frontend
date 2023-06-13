import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const domain = 'dev-4b8tajd0hqyogg1f.us.auth0.com';
const clientId = 'Jp7t1MDibiTpgr00IYoMjXRly3EdpVmU';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>
);
