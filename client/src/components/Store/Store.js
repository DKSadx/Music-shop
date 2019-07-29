import React, { Component } from 'react';
import axios from 'axios';
import './Store.scss';

import NavBar from '../NavBar/NavBar';
export default class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  generateProductMenuList() {
    return (
      <ul>
        {this.state.products.map((item, i) => {
          return (
            <li key={i}>
              <a href={this.state.products[i].url}>
                {this.state.products[i].name}
                <br />
                {/* Price: {this.state.products[i].price}$ */}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  componentDidMount() {
    axios.get('http://localhost:8080/get-products').then(res => {
      // console.log(res);
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
          {this.state.products && (
            <>
              <div className="store-grid-menu">{this.generateProductMenuList()}</div>
              <div className="store-grid-products">{this.generateProductMenuList()}</div>
            </>
          )}
        </div>
      </div>
    );
  }
}
