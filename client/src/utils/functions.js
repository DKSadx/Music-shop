import axios from 'axios';

// Used for delaying next action for x amount of ms
export const delay = time => new Promise(resolve => setTimeout(resolve, time));

export const addToCart = async productId => {
  const jwtToken = localStorage.getItem('shop-token');
  const api = 'http://localhost:8080/cart/addToCart';
  const data = {
    productId
  };
  const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
  const res = await axios.post(api, data, config);
  return res.data.cartSize;
};

export const getCartSize = async () => {
  const jwtToken = localStorage.getItem('shop-token');
  const api = 'http://localhost:8080/cart/getCartSize';
  const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
  const res = await axios.get(api, config);
  return res.data.cartSize;
};
