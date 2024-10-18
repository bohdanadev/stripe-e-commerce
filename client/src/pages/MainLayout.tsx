import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { addProductsToFirestore } from '../firebase/utils/product';
import './../App.scss';

const MainLayout = () => {
  useEffect(() => {
    addProductsToFirestore();
  }, []);
  return (
    <div className='app'>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default MainLayout;
