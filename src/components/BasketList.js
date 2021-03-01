import { useContext } from 'react';
import { urlCart } from '../constans';
import { BasketContext } from '../context/BasketContext';

const BasketList = () => {
  const {
    yourCart,
    products,
    setYourCart,
    increaseQty,
    decreaseQty,
  } = useContext(BasketContext);

  //delete item in database
  const deleteItem = (id) => {
    fetch(`${urlCart}/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const updatedCart = yourCart.filter((item) => item.id !== id);
      setYourCart(updatedCart);
    });
  };

  //display item in shopping cart function

  const displayItem = (id) => {
    const item = products.find((el) => el.id === id);

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <img
            src={require(`../images/${item.image}`).default}
            alt='product_photo'
            style={{ height: 100 }}
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
              src={require('../images/x-img.png').default}
              className='product-delete-btn'
              onClick={() => deleteItem(el.productId)}
              alt='delete_btn'
            />
          </div>
          {displayItem(el.productId)}
          <div className='btn-qty-container'>
            <button
              onClick={() => decreaseQty(el.productId, el.quantity)}
              className='btn-qty'
            >
              -
            </button>
            <p className='cart-product-qty'>{el.quantity}</p>
            <button
              onClick={() => increaseQty(el.productId, el.quantity)}
              className='btn-qty'
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasketList;
