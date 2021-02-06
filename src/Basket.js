import { useEffect, useState } from 'react';
import BasketList from './BasketList';
import BasketSummary from './BasketSummary';
import { urlCart, urlProducts } from './constans';

const Basket = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [yourCart, setYourCart] = useState(null);
  const [products, setProducts] = useState(null);
  // const [subtotal, setSubtotal] = useState(100);

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

  const disableBtn = () => {
    const btn = document.querySelector('.btn-checkout');
    btn.classList.add('hide');
  };

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

  const updateCart = () => {
    console.log('chce się uaktualnic');
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
                <>
                  <BasketList
                    yourCart={yourCart}
                    products={products}
                    setYourCart={setYourCart}
                    decreaseQty={decreaseQty}
                    increaseQty={increaseQty}
                  />
                  <div className='update-cart'>
                    <button className='btn-update-cart' onClick={updateCart}>
                      Update Shopping Cart
                    </button>
                  </div>
                </>
              )}
            </>
          </div>
          <BasketSummary
            yourCart={yourCart}
            products={products}
            // subtotal={subtotal}
          />
        </>
      )}
    </div>
  );
};

export default Basket;
