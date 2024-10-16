import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { cartActions } from '../../redux/slices/cartSlice';
import './cart-page.styles.scss';

const Total = () => {
  const { itemCount, total } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className='total-container'>
      <div className='total'>
        <p>Total Items: {itemCount}</p>
        <p>{`Total: $${total}`}</p>
      </div>
      <div className='checkout'>
        <button
          className='button is-black'
          onClick={() => navigate('/checkout')}
        >
          CHECKOUT
        </button>
        <button
          className='button is-white'
          onClick={() => dispatch(cartActions.clearCart())}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default Total;
