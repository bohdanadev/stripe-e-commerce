import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface';
import { isInCart } from '../../helpers/isInCart';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { cartActions } from '../../redux/slices/cartSlice';
import './featured-product.styles.scss';

interface IProps {
  product: IProduct;
}

const FeaturedProduct: FC<IProps> = ({ product }) => {
  const navigate = useNavigate();
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { title, imageUrl, price, id } = product;
  const itemInCart = isInCart(id, cartItems);

  return (
    <div className='featured-product'>
      <div
        className='featured-image'
        onClick={() => navigate(`/product/${id}`)}
      >
        <img src={imageUrl} alt='product' />
      </div>
      <div className='name-price'>
        <h3>{title}</h3>
        <p>$ {price}</p>
        {!itemInCart && (
          <button
            className='button is-black nomad-btn'
            onClick={() => dispatch(cartActions.addItem(product))}
          >
            ADD TO CART
          </button>
        )}
        {itemInCart && (
          <button
            className='button is-white nomad-btn'
            id='btn-white-outline'
            onClick={() => dispatch(cartActions.increaseQuantity(1))}
          >
            ADD MORE
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
