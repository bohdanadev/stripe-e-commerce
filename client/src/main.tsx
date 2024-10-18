import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { store } from './redux/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { stripeConfig } from './config/config';
import './index.css';

const stripePromise = loadStripe(stripeConfig.apiKey);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Elements>
  </StrictMode>
);
