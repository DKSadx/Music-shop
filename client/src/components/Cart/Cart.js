import React, { Component } from 'react';
import axios from 'axios';
import './Cart.scss';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      cartSize: 0
    };
    this.generateCartItems = this.generateCartItems.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }
  removeFromCart(id) {
    const api = 'http://localhost:8080/cart/removeFromCart';
    const data = {
      _id: id
    };
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .post(api, data, config)
      .then(res => {
        this.setState(
          {
            cartItems: res.data.cart
          },
          // Sends updated amount to parent component via props function, NavBar
          () => this.props.updateCartSize(this.state.cartItems.length)
        );
      })
      .catch(err => console.log(err));
  }
  generateCartItems() {
    const { cartItems } = this.state;
    return (
      <ul className="cart-items">
        {cartItems.map((product, i) => {
          return (
            <li key={i}>
              <p>ProductID: {product._id}</p>
              <p>Name: {product.name}</p>
              <p>Price:{product.price}</p>
              <p>Description: {product.description}</p>
              <p>Category: {product.category}</p>
              <img className="cart-product-image" src={product.imageUrl} alt={product.name} />
              <button onClick={() => this.removeFromCart(product._id)}>Remove</button>
            </li>
          );
        })}
      </ul>
    );
  }
  componentDidMount() {
    // Gets cart items from a db
    const api = 'http://localhost:8080/cart/getCart';
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios.get(api, config).then(res => {
      this.setState({
        cartItems: res.data.cart
      });
    });
  }

  render() {
    const { cartItems } = this.state;
    return (
      <div className="cart-page">
        <i className="close-icon far fa-times-circle" onClick={() => this.props.close()} />
        <div>{cartItems && this.generateCartItems()}</div>
      </div>
    );
  }
}
