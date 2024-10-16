// import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { auth } from '../../firebase';
// import { UserContext } from '../../context/user-context';
import './header.styles.scss';
import CartIcon from '../cart-icon/CartIcon';

const Header = () => {
  // const { user } = useContext(UserContext);
  return (
    <nav
      className='nav-menu container'
      style={{
        position: 'fixed',
        zIndex: 1,
        maxWidth: '100%',
        backgroundColor: 'lightgray',
        width: '100%',
      }}
    >
      <div className='logo'>
        <Link to='/'>BAGS</Link>
      </div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/shop'>Shop</Link>
        </li>
        {/* {!user && (
          <li>
            <Link to='/sign-in'>Sign In</Link>
          </li>
        )}
        {user && <li onClick={() => auth.signOut()}>Sign Out</li>}
        {!user && (
          <li>
            <Link to='/sign-up'>Sign Up</Link>
          </li>
        )} */}
      </ul>
      <CartIcon />
    </nav>
  );
};

export default Header;
