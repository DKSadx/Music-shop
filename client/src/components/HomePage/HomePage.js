import React, { Component } from 'react';
import queryString from 'query-string';

import { getCartSize } from '../../utils/functions';
import NavBar from '../NavBar/NavBar';
import Slideshow from '../Slideshow/Slideshow';
import TrendingMenu from '../TrendingMenu/TrendingMenu';
import PopularMenu from '../PopularMenu/PopularMenu';
import Footer from '../Footer/Footer';

export default class HomePage extends Component {
  constructor(props) {
    document.title = 'Home';
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
      <>
        <NavBar cartSize={this.state.cartSize} updateCartSize={this.updateCartSize} />
        <Slideshow />
        <TrendingMenu
          className="trending-menu"
          query={queryString.parse(this.props.location.search)}
          updateCartSize={this.updateCartSize}
        />
        <PopularMenu
          className="popular-menu"
          query={queryString.parse(this.props.location.search)}
          updateCartSize={this.updateCartSize}
        />
        <Footer />
      </>
    );
  }
}
