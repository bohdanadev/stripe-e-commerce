import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import FeaturedProduct from './shared/FeaturedProduct';
import { productsActions } from '../redux/slices/productsSlice';

const FeaturedCollection = () => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productsActions.getAll());
  }, [dispatch]);

  const productItems = products
    .filter((_product, i) => i < 4)
    .map((product) => <FeaturedProduct product={product} key={product.id} />);

  return (
    <div className='featured-collection container'>
      <h2 className='featured-section-title'>Featured Collection</h2>
      <div className='products'>{productItems}</div>
    </div>
  );
};

export default FeaturedCollection;
