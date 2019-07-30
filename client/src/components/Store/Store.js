import React, { Component } from 'react';
import axios from 'axios';
import './Store.scss';

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
export default class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  generateCategoriesList() {
    return (
      <ul>
        <li className="store-grid-categories-first-li">Categories:</li>
        {this.state.categories.map((item, i) => {
          return (
            <li className="category-list-items" key={i}>
              {this.state.categories[i].name}
            </li>
          );
        })}
      </ul>
    );
  }
  generateProducts() {
    const { products } = this.state;
    return (
      <ul>
        {products.map((item, i) => {
          return (
            <li key={i}>
              <a href={products[i].imageUrl}>
                <div className="store-grid-products-info">
                  <div className="store-grid-products-info-onHover" />
                  <img src={products[i].imageUrl} alt="img" />
                  <div className="store-grid-products-info-text">
                    <p>{products[i].name}</p>
                    <p>{products[i].price}$</p>
                    <button>Add to cart</button>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  componentDidMount() {
    axios.get('http://localhost:8080/get-categories').then(res => {
      this.setState({
        categories: res.data
      });
    });
    axios.get('http://localhost:8080/get-products').then(res => {
      this.setState({
        products: res.data
      });
    });
  }
  render() {
    return (
      <div className="store">
        <div className="shopCover">
          <NavBar />
          <h3>Welcome to the store</h3>
        </div>
        <div className="store-grid-container">
          {this.state.products && this.state.categories && (
            <>
              <div className="store-grid-categories">{this.generateCategoriesList()}</div>
              <div className="store-grid-products">{this.generateProducts()}</div>
            </>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
