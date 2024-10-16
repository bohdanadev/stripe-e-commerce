import { FC } from 'react';
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from '../../components/icons';
import { ICartItem } from '../../interfaces/product.interface';
import { cartActions } from '../../redux/slices/cartSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import './cart-page.styles.scss';

const CartItem: FC<ICartItem> = ({ title, imageUrl, price, quantity, id }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='cart-item'>
      <div className='item-image'>
        <img src={imageUrl} alt='product' />
      </div>
      <div className='name-price'>
        <h4>{title}</h4>
        <p>${price}</p>
      </div>
      <div className='quantity'>
        <p>{`Quantity: ${quantity}`}</p>
      </div>
      <div className='btns-container'>
        <button
          className='btn-increase'
          onClick={() => dispatch(cartActions.increaseQuantity(id))}
        >
          <PlusCircleIcon width='20px' />
        </button>

        {quantity > 1 && (
          <button
            className='btn-decrease'
            onClick={() => dispatch(cartActions.decreaseQuantity(id))}
          >
            <MinusCircleIcon width='20px' />
          </button>
        )}
        <button
          className='btn-trash'
          onClick={() => dispatch(cartActions.removeItem(id))}
        >
          <TrashIcon width='20px' />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
