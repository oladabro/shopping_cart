import { sendOrder } from './constans';

const NavBar = () => {
  return (
    <div className='superContainer'>
      <div className='nav-bar'>
        <h1>Shopping Cart</h1>
        <button className='btn-checkout' onClick={sendOrder}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
