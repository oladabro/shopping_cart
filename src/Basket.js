import { useEffect, useState } from 'react';
import BasketList from './BasketList';
import BasketSummary from './BasketSummary';
import { urlCart, urlProducts } from './constans';

const Basket = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [yourCart, setYourCart] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch(urlCart)
      .then((res) => {
        if (!res.ok) {
          throw Error('fetch failure');
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setYourCart(data);
        setIsPending(false);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });

    fetch(urlProducts)
      .then((res) => {
        if (!res.ok) {
          throw Error('fetch failure');
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setProducts(data);
        setIsPending(false);
        if (yourCart && products) {
          setError(null);
        }
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  console.log(error);
  console.log(products);
  console.log(yourCart);

  const disableBtn = () => {
    const btn = document.querySelector('.btn-checkout');
    btn.classList.add('hide');
  };

  return (
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
              <p className='cart-product-name'>Product Name </p>
              <p className='cart-product-price'>Unit Price </p>
              <p className='cart-product-qty'>Qty </p>
            </div>
            <>
              {yourCart.length == 0 ? (
                <div className='cart-item-empty'>
                  Your shopping cart is empty
                </div>
              ) : (
                <>
                  <BasketList yourCart={yourCart} products={products} />
                  <div className='update-cart'>
                    <button className='btn-update-cart'>
                      Update Shopping Cart
                    </button>
                  </div>
                </>
              )}
            </>
          </div>
          <BasketSummary yourCart={yourCart} products={products} />
        </>
      )}
    </div>
  );
};

export default Basket;
