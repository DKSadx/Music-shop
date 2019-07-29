import React, { Component } from 'react';
import axios from 'axios';
import './Edit.scss';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      categoryName: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addProduct() {
    const { name, price, description, imageUrl } = this.state;
    axios
      .post('http://localhost:8080/add-product', {
        name,
        price,
        description,
        imageUrl
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteProduct() {
    axios
      .delete('http://localhost:8080/delete-product', {
        data: {
          name: this.state.name,
          deleteAll: false
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  deleteAllProducts() {
    axios
      .delete('http://localhost:8080/delete-product', {
        data: {
          name: this.state.name,
          deleteAll: true
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  fillProduct() {
    this.setState({
      name: 'Audio Technica LP120',
      price: '134.99',
      description: 'Audio Technica LP120',
      imageUrl: '/AT-LP120.jpg'
    });
  }
  addCategory() {
    const name = this.state.categoryName;
    axios
      .post('http://localhost:8080/add-category', {
        name
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteCategory() {
    axios
      .delete('http://localhost:8080/delete-category', {
        data: {
          name: this.state.categoryName,
          deleteAll: false
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  deleteAllCategories() {
    axios
      .delete('http://localhost:8080/delete-category', {
        data: {
          name: this.state.categoryName,
          deleteAll: true
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  fillCategory() {
    this.setState({
      categoryName: 'Drums'
    });
  }
  render() {
    return (
      <form className="edit-form">
        <div className="product-edit">
          <h1>Product:</h1>
          <h4>Name:</h4>
          <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
          <h4>Price:</h4>
          <input type="text" name="price" onChange={this.handleChange} value={this.state.price} />
          <h4>Description:</h4>
          <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
          <h4>ImageUrl:</h4>
          <input type="text" name="imageUrl" onChange={this.handleChange} value={this.state.imageUrl} />
          <button type="button" onClick={() => this.addProduct()}>
            Add
          </button>
          <button type="button" onClick={() => this.fillProduct()}>
            Fill
          </button>
          <button type="button" className="edit-delete-btn" onClick={() => this.deleteProduct()}>
            Delete
          </button>
          <button type="button" className="edit-delete-btn" onClick={() => this.deleteAllProducts()}>
            Delete All
          </button>
        </div>
        {/* CATEGORY */}
        <div className="category-edit">
          <h1>Catrgory:</h1>
          <h4>Name:</h4>
          <input type="text" name="categoryName" onChange={this.handleChange} value={this.state.categoryName} />
          <button type="button" onClick={() => this.addCategory()}>
            Add
          </button>
          <button type="button" onClick={() => this.fillCategory()}>
            Fill
          </button>
          <button type="button" className="edit-delete-btn" onClick={() => this.deleteCategory()}>
            Delete
          </button>
          <button type="button" className="edit-delete-btn" onClick={() => this.deleteAllCategories()}>
            Delete All
          </button>
        </div>
      </form>
    );
  }
}
