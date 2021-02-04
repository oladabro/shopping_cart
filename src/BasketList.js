import { useState } from 'react';
import { urlProducts } from './constans';
// import headphones from './images/headphones.png';

const BasketList = ({ yourCart, products }) => {
  const [details, setDetails] = useState(products);

  console.log(products);

  const deleteItem = () => {
    console.log('chcą mnie skasować');
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
              onClick={deleteItem}
            />
          </div>
          {displayItem(el.productId)}
          <p className='cart-product-qty'>{el.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default BasketList;
