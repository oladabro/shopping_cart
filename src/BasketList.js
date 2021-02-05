import { useState } from 'react';
import { urlCart, urlProducts } from './constans';
import useFetch from './useFetch';

const BasketList = ({ yourCart, products: details, setYourCart }) => {
  // const [details, setDetails] = useState(products);

  const deleteItem = (id) => {
    console.log(id);

    fetch(`${urlCart}/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const updatedCart = yourCart.filter((item) => item.id !== id);
      setYourCart(updatedCart);
    });
  };

  const displayItem = (id) => {
    const item = details.find((el) => el.id == id);

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <img
            src={require(`./images/${item.image}`).default}
            alt='product_photo'
            style={{ width: 100, height: 100 }}
            className='cart-item-img'
          />
        </div>
        <p className='cart-product-name'>{item.name}</p>
        <p className='cart-product-price'>{`$ ${item.price}`}</p>
      </>
    );
  };

  return (
    <div className='cart-list'>
      {yourCart.map((el) => (
        <div className='cart-item' key={el.productId}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <img
              src={require('./images/x-img.png').default}
              className='product-delete-btn'
              onClick={() => deleteItem(el.productId)}
            />
          </div>
          {displayItem(el.productId)}
          <div className='btn-qty-container'>
            <button>-</button>
            <p className='cart-product-qty'>{el.quantity}</p>
            <button>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasketList;
