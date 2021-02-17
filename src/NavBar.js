import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='superContainer'>
      <div className='nav-bar'>
        <h1>Shopping Cart</h1>
        <Link className='btn-checkout' to='/submitted'>
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
