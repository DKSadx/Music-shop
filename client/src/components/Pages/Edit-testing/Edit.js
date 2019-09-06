import React, { Component } from 'react';
import axios from 'axios';

import './Edit.scss';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    document.title = 'Edit';
    this.state = {
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      category: '',
      objectId: '',
      categoryName: '',
      isAdmin: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addProduct() {
    const { name, price, description, imageUrl, category } = this.state;
    const api = 'http://localhost:8080/product';
    const data = { name, price, description, imageUrl, category };
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .post(api, data, config)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteProduct(objectId) {
    const api = 'http://localhost:8080/product/delete';
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    let data;
    if (objectId) {
      data = {
        objectId: this.state.objectId
      };
    } else {
      data = {
        name: this.state.name
      };
    }
    axios
      .post(api, data, config)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  fillProduct() {
    this.setState({
      name: 'CORT Z CUSTOM BS',
      price: '759.99',
      description: "Equipped with Seymour Duncan JB and '59 pickup set",
      imageUrl: '/Cort-z-custom-bs.jpg',
      category: 'Guitars and Bass'
    });
  }
  clearProduct() {
    this.setState({
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      category: ''
    });
  }
  addCategory() {
    const name = this.state.categoryName;
    const api = 'http://localhost:8080/category';
    const data = { name };
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .post(api, data, config)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteCategory() {
    const api = 'http://localhost:8080/category/delete';
    const data = {
      name: this.state.categoryName
    };
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .post(api, data, config)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  fillCategory() {
    this.setState({
      categoryName: 'Other'
    });
  }
  componentDidMount() {
    const api = 'http://localhost:8080/auth/isAdmin';
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .get(api, config)
      .then(res => {
        if (res.data.isAdmin)
          this.setState({
            isAdmin: true
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { isAdmin } = this.state;
    return isAdmin ? (
      <form className="edit-form">
        <div className="product-edit">
          <h1>Product:</h1>
          <h4>Name:</h4>
          <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
          <h4>Price:</h4>
          <input type="text" name="price" onChange={this.handleChange} value={this.state.price} />
          <h4>Description:</h4>
          <input
            type="text"
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <h4>ImageUrl:</h4>
          <input
            type="text"
            name="imageUrl"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />
          <h4>Category:</h4>
          <input
            type="text"
            name="category"
            onChange={this.handleChange}
            value={this.state.category}
          />
          <h4>ObjectId:</h4>
          <input
            type="text"
            name="objectId"
            onChange={this.handleChange}
            value={this.state.objectId}
          />
          <button type="button" onClick={() => this.addProduct()}>
            Add
          </button>
          <button type="button" onClick={() => this.fillProduct()}>
            Fill
          </button>
          <button type="button" onClick={() => this.clearProduct()}>
            Clear
          </button>
          <button type="button" className="edit-delete-btn" onClick={() => this.deleteProduct()}>
            Delete
          </button>
          <button
            type="button"
            className="edit-delete-btn"
            onClick={() => this.deleteProduct(true)}
          >
            Delete by Id
          </button>
        </div>
        {/* CATEGORY */}
        <div className="category-edit">
          <h1>Category:</h1>
          <h4>Name:</h4>
          <input
            type="text"
            name="categoryName"
            onChange={this.handleChange}
            value={this.state.categoryName}
          />
          <button type="button" onClick={() => this.addCategory()}>
            Add
          </button>
          <button type="button" onClick={() => this.fillCategory()}>
            Fill
          </button>
          <button type="button" className="edit-delete-btn" onClick={() => this.deleteCategory()}>
            Delete
          </button>
        </div>
      </form>
    ) : (
      <h1>Not authorized to view this site.</h1>
    );
  }
}
