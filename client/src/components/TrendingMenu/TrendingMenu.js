import React, { Component } from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';
import { withRouter } from 'react-router-dom';

import './TrendingMenu.scss';
import trendingBg from '../../assets/images/trending-bg.jpg';
import DetailsPage from '../Modals/DetailsPage/DetailsPage';

class TrendingMenu extends Component {
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
  render() {
    const { query } = this.state;
    const { className, updateCartSize } = this.props;
    return (
      // class=trending-menu
      <div className={className}>
        <img src={trendingBg} id="trending-image" alt="Trending" />
        <Controller>
          <Scene duration={400} offset={-100} triggerElement="#trending-image">
            <Tween
              staggerFrom={{
                y: 300,
                opacity: 0,
              }}
              staggerTo={{
                y: 0,
                opacity: 1,
              }}
            >
              <p id="trending-text">Trending now:</p>
              <ul className="trending-menu-items">
                <li id="trending-item-1">
                  <p>Sony WH-CH500</p>
                  <p
                    id="trending-item-buy"
                    onClick={() => this.showDetailsPage('5d534ec6ed674819496ef8f1')}
                  >
                    Buy
                  </p>
                </li>
                <li id="trending-item-2">
                  <p>Shure SM57</p>
                  <p
                    id="trending-item-buy"
                    onClick={() => this.showDetailsPage('5d534ec7ed674819496ef8f2')}
                  >
                    Buy
                  </p>
                </li>
                <li id="trending-item-3">
                  <p>Beoplay H9</p>
                  <p
                    id="trending-item-buy"
                    onClick={() => this.showDetailsPage('5d534ec6ed674819496ef8f0')}
                  >
                    Buy
                  </p>
                </li>
              </ul>
            </Tween>
          </Scene>
        </Controller>
        {query.productId && (
          <DetailsPage
            productId={query.productId}
            close={this.closeDetailsPage}
            updateCartSize={updateCartSize}
          />
        )}
      </div>
    );
  }
}

export default withRouter(TrendingMenu);
