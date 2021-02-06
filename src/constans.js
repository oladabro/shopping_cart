export const urlCart = 'http://localhost:8000/yourCart';
export const urlProducts = 'http://localhost:9000/products';
export const shippingValue = 23.8;
export const freeShipping = 0;
export const freeShipOrderValue = 100;

export const sendOrder = () => {
  console.log('wysyłam zamówienie');
  const navBar = document.querySelector('.nav-bar');
  const cart = document.querySelector('.container');
  const order = document.querySelector('.order-sent');
  const superContainer = document.querySelector('.superContainer');
  console.log(superContainer);

  navBar.classList.add('hide');
  cart.classList.add('hide');
  order.classList.remove('hide');
  superContainer.style.boxShadow = '0 0 0 white';
};
