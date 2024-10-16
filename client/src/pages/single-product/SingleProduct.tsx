import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { IProduct } from '../../interfaces/product.interface';
import { isInCart } from '../../helpers/isInCart';
import { cartActions } from '../../redux/slices/cartSlice';
import './single-product.styles.scss';

const SingleProduct = () => {
  const { products } = useAppSelector((state) => state.products);
  const { cartItems } = useAppSelector((state) => state.cart);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  useEffect(() => {
    const productExists = products.find(
      (item) => Number(item.id) === Number(id)
    );
    if (productExists) {
      setProduct(productExists);
    } else {
      navigate('/shop');
    }
  }, [id, navigate, products]);
  // while we check for product
  if (!product) {
    return null;
  }
  const itemInCart = isInCart(Number(id), cartItems);

  // const product = {
  //   id: 1,
  //   title: 'Studio Bag',
  //   description:
  //     'The Studio Bag is identical to its predecessor plus a few more inches to love. Transition it from satchel to backpack to crossbody simply by changing straps. Carry it wherever you go - it will be ready to adapt to your needs and keep up with your lifestyle.',
  //   imageUrl: 'https://i.ibb.co/PcXVJ8m/studiobag.jpg',
  //   price: 15,
  // };
  const { imageUrl, title, price, description } = product;

  return (
    <div className='single-product-container'>
      <div className='product-image'>
        <img src={imageUrl} alt='product' />
      </div>
      <div className='product-details'>
        <div className='name-price'>
          <h3>{title}</h3>
          <p>{price}</p>
        </div>
        <div className='add-to-cart-btns'>
          {!itemInCart && (
            <button
              className='button is-white nomad-btn'
              id='btn-white-outline'
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

          <button className='button is-black nomad-btn' id='btn-white-outline'>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className='product-description'>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
