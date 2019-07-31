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
        <li className="category-list-items" onClick={() => this.fetchProducts()}>
          All products
        </li>
        {this.state.categories.map((item, i) => {
          return (
            // prettier-ignore
            <li
              key={i}
              className="category-list-items"
              onClick={() => this.fetchProducts(this.state.categories[i].name)}
            >
              {this.state.categories[i].name}
            </li>
          );
        })}
      </ul>
    );
  }
  generateProducts() {
    const products = this.state.products;
    return (
      <ul>
        {products.map((item, i) => {
          return (
            <li key={i}>
              <a>
                <div className="store-grid-products-info">
                  <div className="store-grid-products-info-onHover">{products[i]._id}</div>
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
  fetchProducts(category) {
    if (category) {
      // Fetch one category of products
      axios.post('http://localhost:8080/get-category', { name: category }).then(result => {
        this.setState({
          products: result.data[0].products
        });
      });
    } else {
      // Fetch all products
      axios.get('http://localhost:8080/get-all-products').then(res => {
        this.setState({
          products: res.data
        });
      });
    }
  }
  componentDidMount() {
    axios.get('http://localhost:8080/get-categories').then(res => {
      this.setState({
        categories: res.data
      });
    });
    axios.get('http://localhost:8080/get-all-products').then(res => {
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
