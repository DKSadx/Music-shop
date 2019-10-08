import React, { Component } from 'react';
import axios from 'axios';
import { Tween } from 'react-gsap';

import './Cart.scss';
import Spinner from '../../Spinner/Spinner';
import { baseIp } from '../../../utils/consts';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: null,
      cartSize: 0,
      totalPrice: 0,
    };
    this.generateCartItems = this.generateCartItems.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.changeQty = this.changeQty.bind(this);
  }
  removeFromCart(id) {
    const api = `${baseIp}/cart/removeFromCart`;
    const data = {
      productId: id,
    };
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .post(api, data, config)
      .then(res => {
        const total = this.calculateTotal(res.data.cart);
        if (res.data.cart) {
          this.setState(
            {
              cartItems: res.data.cart,
              totalPrice: total,
            },
            // Sends updated amount to parent component via props function, Store <- NavBar <- Cart
            () => this.props.updateCartSize(this.state.cartItems.length),
          );
        }
      })
      .catch(err => console.log(err));
  }
  generateCartItems() {
    const { cartItems } = this.state;
    return cartItems.map((item, i) => {
      return (
        <li key={i} className="cart-product">
          <img className="cart-product-image" src={item.product.imageUrl} alt={item.product.name} />
          <p className="cart-product-name">{item.product.name}</p>
          <p className="cart-product-price">{item.product.price}$</p>
          <div className="cart-product-qty">
            <i
              className="cart-product-qty-minus fas fa-minus"
              onClick={() => this.changeQty(item.product._id, '-')}
            />
            <p className="cart-product-qty-number">{item.quantity}</p>
            <i
              className="cart-product-qty-plus fas fa-plus"
              onClick={() => this.changeQty(item.product._id, '+')}
            />
          </div>
          <p className="cart-product-total">
            {Math.round(item.quantity * item.product.price * 100) / 100}$
          </p>
          <p className="cart-product-description">Description: {item.product.description}</p>
          <p className="cart-product-remove" onClick={() => this.removeFromCart(item.product._id)}>
            Remove
          </p>
        </li>
      );
    });
  }
  changeQty(productId, sign) {
    const value = sign === '-' ? -1 : 1;
    const api = `${baseIp}/cart/changeQuantity`;
    const data = { productId, value };
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios.post(api, data, config).then(res => {
      if (res.data.cart) {
        const total = this.calculateTotal(res.data.cart);
        this.setState({
          cartItems: res.data.cart,
          totalPrice: total,
        });
      }
    });
  }
  calculateTotal(cart) {
    let total = 0;
    cart.map(item => (total += item.quantity * item.product.price));
    total = Math.round(total * 100) / 100;
    return total;
  }
  componentDidMount() {
    // Gets cart items from a db
    const api = `${baseIp}/cart/getCart`;
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios.get(api, config).then(res => {
      if (res.data.cart) {
        const total = this.calculateTotal(res.data.cart);
        this.setState({
          cartItems: res.data.cart,
          totalPrice: total,
        });
      }
    });
  }

  render() {
    const { cartItems, totalPrice } = this.state;
    const { close } = this.props;
    return (
      <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={0.8}>
        <div className="cart-page">
          <i className="close-icon far fa-times-circle" onClick={() => close()} />
          <div className="cart-items-container">
            <h1 className="cart-header">Shopping cart</h1>
            {cartItems ? (
              <>
                <ul>
                  <ul className="cart-titles">
                    <li />
                    <li />
                    <li>Price</li>
                    <li>Qty</li>
                    <li>Total</li>
                  </ul>
                  {cartItems && this.generateCartItems()}
                </ul>
                <ul className="cart-checkout">
                  <p className="cart-checkout-note">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, beatae nisi!
                    Dolorum consequatur corporis dignissimos, est harum quos fugiat explicabo, quas
                    doloremque reprehenderit officiis tenetur fugit totam vero adipisci obcaecati.
                  </p>
                  <li>
                    <p className="cart-checkout-left">Subtotal:</p>
                    <p className="cart-checkout-right">{totalPrice}$</p>
                  </li>
                  <li>
                    <p className="cart-checkout-left">Shipping:</p>
                    <p className="cart-checkout-right">0.00$</p>
                  </li>
                  <li className="cart-checkout-total">
                    <p className="cart-checkout-left">TOTAL:</p>
                    <p className="cart-checkout-right">{totalPrice}$</p>
                  </li>
                  <button className="cart-checkout-button">Check Out</button>
                </ul>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </Tween>
    );
  }
}
