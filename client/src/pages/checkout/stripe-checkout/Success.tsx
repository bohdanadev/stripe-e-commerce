import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { cartActions } from '../../../redux/slices/cartSlice';

const Success = () => {
  const navigate = useNavigate();
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cartItems.length !== 0) {
      dispatch(cartActions.clearCart());
    }
  }, [cartItems, dispatch]);

  return (
    <div className='checkout'>
      <h1>Thank you for your order</h1>
      <p>
        We are currently processing your order and will send you a confirmation
        email shortly
      </p>
      <div>
        <button
          className='button is-black nomad-btn submit'
          onClick={() => navigate('/shop')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Success;
