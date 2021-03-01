import BasketList from './BasketList';
import BasketSummary from './BasketSummary';
import { useContext } from 'react';
import { BasketContext } from '../context/BasketContext';

const Basket = () => {
  const { disableBtn, error, isPending, yourCart, products } = useContext(
    BasketContext
  );

  return (
    <div className='superContainer'>
      <div className='container'>
        {error && (
          <div>
            {disableBtn()}
            {error}
          </div>
        )}
        {isPending && <div>Loading...</div>}
        {yourCart && products && (
          <>
            <div className='cart'>
              <div className='cart-header'>
                <p className='cart-header-name'>Product Name </p>
                <p className='cart-header-price'>Unit Price </p>
                <p className='cart-header-qty'>Qty </p>
              </div>
              <>
                {yourCart.length === 0 ? (
                  <div className='cart-item-empty'>
                    Your shopping cart is empty
                  </div>
                ) : (
                  <BasketList />
                )}
              </>
            </div>
            <BasketSummary />
          </>
        )}
      </div>
    </div>
  );
};

export default Basket;
