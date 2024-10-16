import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/cart-page/CartPage';
import SingleProduct from './pages/single-product/SingleProduct';
import Shop from './pages/shop/Shop';
import HomePage from './pages/HomePage';
import MainLayout from './pages/MainLayout';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import ErrorPage from './pages/ErrorPage';
import Checkout from './pages/checkout/Checkout';
import Success from './pages/checkout/stripe-checkout/Success';
import Canceled from './pages/checkout/stripe-checkout/Canceled';

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <Shop /> },
      { path: 'product/:id', element: <SingleProduct /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'success', element: <Success /> },
      { path: 'canceled', element: <Canceled /> },
    ],
  },
  { path: 'sign-up', element: <SignUp /> },
  { path: 'sign-in', element: <SignIn /> },
  { path: '*', element: <NotFoundPage /> },
]);

export { router };
