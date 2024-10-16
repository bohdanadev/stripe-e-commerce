import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './../App.scss';
import { addProductsToFirestore } from '../firebase/utils/product';

const MainLayout = () => {
  useEffect(() => {
    addProductsToFirestore();
  }, []);
  return (
    <div className='app'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
