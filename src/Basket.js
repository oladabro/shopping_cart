import { useEffect, useState } from 'react';
import BasketList from './BasketList';
import BasketSummary from './BasketSummary';
import { urlCart, urlProducts } from './constans';

const Basket = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [yourCart, setYourCart] = useState(null);
  const [products, setProducts] = useState(null);

  const getData = async (uri) => {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error('fetching data error');
    }
    const data = await response.json();
    return data;
  };

  //fetching data from 2 urls

  useEffect(() => {
    getData(urlCart)
      .then((data) => {
        setYourCart(data);
        setIsPending(false);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });

    getData(urlProducts)
      .then((data) => {
        setProducts(data);
        setIsPending(false);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  //hide proceed to checkout btn when fetching data error occurs

  const disableBtn = () => {
    const btn = document.querySelector('.btn-checkout');
    btn.classList.add('hide');
  };

  //update quantity in local state

  const updateQty = (id, qty, method) => {
    const newArray = yourCart.filter((el) => el.id !== id);

    if (method === 'decrease') {
      const newEl = [
        {
          id: id,
          productId: id,
          quantity: qty - 1,
        },
      ];
      const newCart = [...newArray, ...newEl].sort((a, b) => {
        return a.id - b.id;
      });
      setYourCart(newCart);
    }
    if (method === 'increase') {
      const newEl = [
        {
          id: id,
          productId: id,
          quantity: qty + 1,
        },
      ];
      const newCart = [...newArray, ...newEl].sort((a, b) => {
        return a.id - b.id;
      });
      setYourCart(newCart);
    }
  };

  //decrease quantity in database

  const decreaseQty = (id, qty) => {
    if (qty > 0) {
      fetch(`${urlCart}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: qty - 1,
        }),
      }).then(() => {
        updateQty(id, qty, 'decrease');
      });
    }
  };

  //increase quantity in database

  const increaseQty = (id, qty) => {
    fetch(`${urlCart}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: qty + 1,
      }),
    }).then(() => {
      updateQty(id, qty, 'increase');
    });
  };

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
                  <BasketList
                    yourCart={yourCart}
                    details={products}
                    setYourCart={setYourCart}
                    decreaseQty={decreaseQty}
                    increaseQty={increaseQty}
                  />
                )}
              </>
            </div>
            <BasketSummary yourCart={yourCart} products={products} />
          </>
        )}
      </div>
    </div>
  );
};

export default Basket;
