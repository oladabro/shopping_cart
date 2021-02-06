import { useEffect, useState } from 'react';

const BasketSummary = ({ yourCart, products }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

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
  }, []);

  useEffect(() => {
    if (subtotal <= 100) {
      setShippingCost(23.8);
    } else {
      setShippingCost(0);
    }
    setGrandTotal(subtotal + shippingCost);
  }, [subtotal, shippingCost]);

  const displayShippingCost = () => {
    if (subtotal <= 100) {
      return (
        <div className='cart-shipping-cost'>
          Shipping: <span>$23.80</span>
        </div>
      );
    }
    if (subtotal > 100) {
      return (
        <div className='cart-shipping-cost'>
          Shipping: <span>$ 0</span>
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
          <button className='btn-checkout'>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default BasketSummary;
