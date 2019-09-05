import React, { Component } from 'react';
import queryString from 'query-string';
import './Store.scss';

import { getCartSize, isAuth } from '../../utils/functions';
import NavBar from '../NavBar/NavBar';
import StoreCover from '../StoreCover/StoreCover';
import StoreProducts from '../StoreProducts/StoreProducts';
import Footer from '../Footer/Footer';

export default class Store extends Component {
  constructor(props) {
    document.title = 'Store';
    super(props);
    this.state = {
      cartSize: 0,
      isLoggedIn: false
    };
    this.updateCartSize = this.updateCartSize.bind(this);
  }
  updateCartSize(cartSize) {
    this.setState({
      cartSize
    });
  }
  async componentDidMount() {
    const isLoggedIn = await isAuth();
    const cartSize = await getCartSize();
    this.setState({
      cartSize,
      isLoggedIn
    });
  }
  render() {
    return (
      <div className="store">
        <NavBar cartSize={this.state.cartSize} updateCartSize={this.updateCartSize} />
        <StoreCover />
        <StoreProducts
          query={queryString.parse(this.props.location.search)}
          updateCartSize={this.updateCartSize}
          isLoggedIn={this.state.isLoggedIn}
        />
        <Footer />
      </div>
    );
  }
}
