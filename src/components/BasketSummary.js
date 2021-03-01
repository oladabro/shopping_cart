import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { freeShipOrderValue, freeShipping, shippingValue } from '../constans';
import { BasketContext } from '../context/BasketContext';

const BasketSummary = () => {
  const { yourCart, products } = useContext(BasketContext);

  const [subtotal, setSubtotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  //set subtotal value
  useEffect(() => {
    const subtotalArray = [];
    let result = 0;
    yourCart.forEach((element) => {
      const elQty = element.quantity;
      const elPrice = products.find((el) => el.id === element.id).price;
      const elValue = elQty * elPrice;

      subtotalArray.push(elValue);
      result = subtotalArray.reduce((a, b) => {
        return a + b;
      });
    });

    setSubtotal(result);
  }, [yourCart]);

  //set shipping costs and calculate grand total value

  useEffect(() => {
    if (subtotal <= freeShipOrderValue) {
      setShippingCost(shippingValue);
    } else {
      setShippingCost(freeShipping);
    }
    setGrandTotal(subtotal + shippingCost);
  }, [subtotal, shippingCost]);

  //display shipping cost

  const displayShippingCost = () => {
    if (subtotal <= freeShipOrderValue) {
      return (
        <div className='cart-shipping-cost'>
          Shipping: <span>${shippingValue}</span>
        </div>
      );
    }
    if (subtotal > freeShipOrderValue) {
      return (
        <div className='cart-shipping-cost'>
          Shipping: <span>${freeShipping}</span>
        </div>
      );
    }
  };

  return (
    <div className='cart-summary-container'>
      {displayShippingCost()}
      <div className='cart-summary-totals'>
        <h3>Cart totals</h3>
        <p>
          Subtotal: <span>${subtotal.toFixed(2)}</span>
        </p>
        <p>
          Grand total: <span>${grandTotal.toFixed(2)}</span>
        </p>
        <div>
          <Link className='btn-checkout' to='/submitted'>
            Proceed to checkout
          </Link>
          <small className='adnote'>
            *Free shippment for order value over $100
          </small>
        </div>
      </div>
    </div>
  );
};

export default BasketSummary;
