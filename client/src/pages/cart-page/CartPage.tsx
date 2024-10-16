import { useAppSelector } from '../../hooks/reduxHooks';
import CartItem from './CartItem';
import Total from './Total';
import './cart-page.styles.scss';

const CartPage = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <div className='empty-cart'>Your Cart is empty</div>
      ) : (
        <>
          <div className='cart-page'>
            <div className='cart-item-container'>
              {cartItems.map((item) => (
                <CartItem {...item} key={item.id} />
              ))}
            </div>
            <Total />
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
