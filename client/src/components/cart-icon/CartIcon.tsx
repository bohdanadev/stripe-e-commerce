import { useNavigate } from 'react-router-dom';
import shoppingBag from '../../assets/shopping-bag.png';
import { useAppSelector } from '../../hooks/reduxHooks';
import './cart-icon.styles.scss';

const CartIcon = () => {
  const { itemCount } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  return (
    <div className='cart-container' onClick={() => navigate('/cart')}>
      <img src={shoppingBag} alt='shopping-cart-icon' />
      {itemCount > 0 ? <span className='cart-count'> {itemCount} </span> : null}
    </div>
  );
};

export default CartIcon;
