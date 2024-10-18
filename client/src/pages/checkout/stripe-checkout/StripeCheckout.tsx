import { useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { fetchFromAPI } from '../../../helpers/fetchFromAPI';

const StripeCheckout = () => {
  const [email, setEmail] = useState<string>('');
  const { cartItems } = useAppSelector((state) => state.cart);
  const stripe = useStripe();

  const handleGuestCheckout = async (e: any) => {
    e.preventDefault();
    const line_items = cartItems.map((item) => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.imageUrl],
          },
        },
      };
    });

    const response = await fetchFromAPI('create-checkout-session', {
      body: { line_items, customer_email: email },
    });

    const { sessionId } = response;
    const { error } = await stripe!.redirectToCheckout({
      sessionId,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  return (
    <form onSubmit={handleGuestCheckout}>
      <div>
        Checkout
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          value={email}
          className='nomad-input'
        />
      </div>
      <div className='submit-btn'>
        <button type='submit' className='button is-black nomad-btn submit'>
          Checkout
        </button>
      </div>
      //{' '}
    </form>
  );
};

export default StripeCheckout;
