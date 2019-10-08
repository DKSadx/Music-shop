import React, { Component } from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { withRouter } from 'react-router-dom';
import { Tween } from 'react-gsap';
import axios from 'axios';

import './PopularMenu.scss';
import DetailsPage from '../Modals/DetailsPage/DetailsPage';
import Spinner from '../Spinner/Spinner';
import { baseIp } from '../../utils/consts';

class PopularMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      query: {
        productId: '',
      },
    };
    this.showDetailsPage = this.showDetailsPage.bind(this);
    this.closeDetailsPage = this.closeDetailsPage.bind(this);
  }

  // Generating <li> items
  createItems() {
    const { products } = this.state;
    return products.map((p, i) => {
      return (
        p.product && (
          <li
            key={i}
            className="popular-grid-item"
            style={{ backgroundImage: `url("${p.product.imageUrl}")` }}
          >
            <div className="popular-item-overlay">
              <button className="details-btn" onClick={() => this.showDetailsPage(p.product._id)}>
                Details
              </button>
            </div>
            <p className="popular-item-name">{p.product.name}</p>
          </li>
        )
      );
    });
  }

  showDetailsPage(productId) {
    this.props.history.push({
      pathname: '/',
      search: `?productId=${productId}`,
    });
    this.setState({
      query: { productId },
    });
  }

  closeDetailsPage() {
    this.props.history.push('/');
    this.setState({
      query: { productId: null },
    });
  }

  componentDidMount() {
    const api = `${baseIp}/product/getPopularMenu`;
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .get(api, config)
      .then(res => {
        if (res.data.products) {
          this.setState({
            products: res.data.products,
          });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    const { products, query } = this.state;
    return (
      <div className={this.props.className}>
        <h3 className="popular-menu-title">Popular products:</h3>
        {products ? (
          <>
            <Controller>
              <Scene
                duration={1400}
                offset={-150}
                triggerElement={`.${this.props.className}`}
                reverse={true}
              >
                <Tween
                  // Wraps all <li> tags that are dynamically created
                  wrapper={<ul className="product-grid" />}
                  staggerFrom={{
                    opacity: 0,
                    cycle: {
                      x: 500,
                    },
                  }}
                  stagger={0.5}
                >
                  {products && this.createItems()}
                </Tween>
              </Scene>
            </Controller>
            {query.productId && (
              <DetailsPage
                productId={query.productId}
                close={this.closeDetailsPage}
                updateCartSize={this.props.updateCartSize}
              />
            )}
          </>
        ) : (
          <div className="popular-fetching">
            <p>Fetching products...</p>
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(PopularMenu);
