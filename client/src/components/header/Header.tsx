import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '../cart-icon/CartIcon';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { auth } from '../../firebase/firebase';
import { cartActions } from '../../redux/slices/cartSlice';
import './header.styles.scss';

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = async () => {
    dispatch(cartActions.clearCart());
    await auth.signOut();
    navigate('/sign-in');
  };
  return (
    <nav
      className='nav-menu container'
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 1,
        maxWidth: '100%',
        backgroundColor: 'lightgray',
      }}
    >
      <div className='logo'>
        <Link to='/'>BAGS</Link>
      </div>
      <ul>
        {user && (
          <li>
            <Link to='/'>Home</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to='/shop'>Shop</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to='/sign-in'>Sign In</Link>
          </li>
        )}
        {user && <li onClick={logout}>Sign Out</li>}
        {!user && (
          <li>
            <Link to='/sign-up'>Sign Up</Link>
          </li>
        )}
      </ul>
      <CartIcon />
    </nav>
  );
};

export default Header;
