import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import the Provider
import { GoogleOAuthProvider } from '@react-oauth/google';  // Google OAuth provider
import App from './App';
import store from './redux/store';  // Import your Redux store

// Replace with your actual Google OAuth client ID
const clientId = "YOUR_GOOGLE_CLIENT_ID";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap the app with the Redux Provider */}
      <GoogleOAuthProvider clientId={clientId}>  {/* Wrap with GoogleOAuthProvider */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
