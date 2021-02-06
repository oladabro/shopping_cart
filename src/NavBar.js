import { sendOrder } from './constans';

const NavBar = () => {
  return (
    <div className='nav-bar'>
      <h1>Shopping Cart</h1>
      <button className='btn-checkout' onClick={sendOrder}>
        Proceed to checkout
      </button>
    </div>
  );
};

export default NavBar;
