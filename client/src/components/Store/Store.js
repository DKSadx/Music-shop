import React, { Component } from 'react';
import queryString from 'query-string';
import './Store.scss';

import { getCartSize } from '../../utils/functions';

import NavBar from '../NavBar/NavBar';
import StoreCover from '../StoreCover/StoreCover';
import StoreProducts from '../StoreProducts/StoreProducts';
import Footer from '../Footer/Footer';

export default class Store extends Component {
  constructor(props) {
    document.title = 'Store';
    super(props);
    this.state = {
      cartSize: 0
    };
    this.updateCartSize = this.updateCartSize.bind(this);
  }
  updateCartSize(cartSize) {
    this.setState({
      cartSize
    });
  }
  async componentDidMount() {
    const cartSize = await getCartSize();
    this.setState({
      cartSize
    });
  }
  render() {
    return (
      <div className="store">
        <NavBar cartSize={this.state.cartSize} />
        <StoreCover />
        <StoreProducts query={queryString.parse(this.props.location.search)} updateCartSize={this.updateCartSize} />
        <Footer />
      </div>
    );
  }
}
