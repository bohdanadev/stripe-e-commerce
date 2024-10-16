import { useEffect } from 'react';
import FeaturedProduct from '../../components/shared/FeaturedProduct';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { productsActions } from '../../redux/slices/productsSlice';
import './shop.styles.scss';

const Shop = () => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productsActions.getAll());
  }, [dispatch]);

  const allProducts = products.map((product) => (
    <FeaturedProduct product={product} key={product.id} />
  ));

  return (
    <div className='product-list-container'>
      <h2 className='product-list-title'>Shop</h2>
      <div className='product-list'>{allProducts}</div>
    </div>
  );
};

export default Shop;
