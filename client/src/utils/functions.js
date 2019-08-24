import axios from 'axios';

export const delay = time => new Promise(resolve => setTimeout(resolve, time));
export const addToCart = productId => {
  const jwtToken = localStorage.getItem('shop-token');
  const api = 'http://localhost:8080/cart/addToCart';
  const data = {
    productId
  };
  const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
  axios
    .post(api, data, config)
    .then()
    .catch(err => console.log(err));
};
