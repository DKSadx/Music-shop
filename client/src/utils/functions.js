import axios from 'axios';
import emailRegex from './consts';

// Used for delaying next action for x amount of ms
export const delay = time => new Promise(resolve => setTimeout(resolve, time));

// Client side validation
export const validation = (email, password, repeatedPassword) => {
  let isValid = true;
  const errorMessages = {
    email: '',
    password: '',
    repeatedPassword: ''
  };
  if (password.value !== repeatedPassword.value) {
    isValid = false;
    errorMessages.repeatedPassword = "Passwords don't match!";
  }
  if (password.value.length < 6) {
    isValid = false;
    errorMessages.password = 'Password is too short!';
  }
  if (!emailRegex.test(email.value)) {
    isValid = false;
    errorMessages.email = 'Email is not valid!';
  }
  // If something is not valid, returns error messages
  if (!isValid) {
    return { isValid, errorMessages };
  }
  return { isValid };
};

export const addToCart = async (productId, quantity = 1) => {
  const jwtToken = localStorage.getItem('shop-token');
  const api = 'http://localhost:8080/cart/addToCart';
  const data = {
    productId,
    quantity
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
