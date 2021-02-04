import { shippingCost } from './constans';

const BasketSummary = ({ yourCart, products }) => {
  const subtotal = 0;

  return (
    <div className='cart-summary-container'>
      <div className='cart-shipping-cost'>
        Shipping: <span>${shippingCost}</span>
      </div>
      <div className='cart-summary-totals'>
        <h3>Cart totals</h3>
        <p>
          Subtotal: <span>{subtotal}</span>
        </p>
        <p>
          Grand total: <span>${subtotal + shippingCost}</span>
        </p>
        <div>
          <button className='btn-checkout'>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default BasketSummary;
