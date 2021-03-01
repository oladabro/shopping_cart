import React, { useState, useEffect, createContext } from 'react';
import { urlCart, urlProducts } from '../constans';

export const BasketContext = createContext();

function BasketContextProvider(props) {
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
    <BasketContext.Provider
      value={{
        error,
        setError,
        isPending,
        setIsPending,
        yourCart,
        setYourCart,
        products,
        setProducts,
        disableBtn,
        updateQty,
        decreaseQty,
        increaseQty,
      }}
    >
      {props.children}
    </BasketContext.Provider>
  );
}

export default BasketContextProvider;
