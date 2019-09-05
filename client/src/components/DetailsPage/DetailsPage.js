import React, { Component } from 'react';
import axios from 'axios';

import './DetailsPage.scss';
import { addToCart } from '../../utils/functions';
import CartNotification from '../CartNotification/CartNotification';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.notification = false;
    this.state = {
      productId: this.props.productId,
      product: null,
      quantity: 1
    };
    this.changeQuantity = this.changeQuantity.bind(this);
  }
  // Increments/decrements quantity
  changeQuantity(sign) {
    let { quantity } = this.state;
    if (sign === '-' && quantity > 1) {
      this.setState({
        quantity: --quantity
      });
    } else if (sign === '+') {
      this.setState({
        quantity: ++quantity
      });
    }
  }
  // Adds item to cart
  async addItemToCart(productId) {
    // notification set to true will trigger this.showNotification()
    this.notification = true;
    // Imported function, adds to cart and returns updated cart size
    const cartSize = await addToCart(productId, this.state.quantity);
    this.props.updateCartSize(cartSize);
  }
  // Shows 'Added to cart' notification
  showNotification() {
    this.notification = false;
    return <CartNotification />;
  }
  // Fetches product data
  componentDidMount() {
    const { productId } = this.state;
    const api = `http://localhost:8080/product/${productId}`;
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .get(api, config)
      .then(res =>
        this.setState({
          product: res.data.product
        })
      )
      .catch(err => console.log(err));
  }
  render() {
    const { productId, product, quantity } = this.state;
    return (
      product && (
        <div className="details-page">
          <i className="close-icon far fa-times-circle" onClick={() => this.props.close()} />
          {/* If the this.notification inside this.addToCart() is set to true, show notification */}
          {this.notification && this.showNotification()}
          <div className="dp-container">
            <img
              className="dp-img"
              src={`http://localhost:3000${product.imageUrl}`}
              alt={product.name}
            />
            <div className="dp-info">
              <h1 className="dp-info-header">{product.name}</h1>
              <p className="dp-info-price">${product.price}</p>
              <p className="dp-info-text">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed provident adipisci
                sunt ut dignissimos quo quibusdam dicta sint ratione minus saepe ex consequuntur
                placeat sapiente obcaecati, tempore a quidem debitis. Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Vero expedita deserunt aspernatur illo tempora quasi
                libero necessitatibus, vel vitae. Quisquam voluptatum accusantium ab porro sequi
                temporibus corporis quaerat, possimus ut.
              </p>
              <i className="fas fa-minus noselect" onClick={() => this.changeQuantity('-')} />
              <input className="dp-info-qty noselect" type="text" value={quantity} readOnly />
              <i className="fas fa-plus noselect" onClick={() => this.changeQuantity('+')} />
              <button
                className="dp-info-btn noselect"
                onClick={() => this.addItemToCart(productId)}
              >
                ADD TO CART
              </button>
              <br />
              <h3 className="dp-info-category">
                Category:
                <p>{product.category}</p>
              </h3>
            </div>
            <div className="dp-description">
              <h4 className="dp-description-title">Description</h4>
              <p className="dp-description-text">
                {product.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Alias aspernatur corrupti nostrum, dolorem facere ab et odio commodi consequatur
                reiciendis consectetur numquam, ducimus molestiae sapiente aperiam ullam laudantium
                error deleniti!
              </p>
            </div>
          </div>
        </div>
      )
    );
  }
}
