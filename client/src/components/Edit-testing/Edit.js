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
    const { name, price, description, imageUrl, category } = this.state;
    axios
      .post('http://localhost:8080/product', {
        name,
        price,
        description,
        imageUrl,
        category
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteProduct(objectId) {
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
      .delete('http://localhost:8080/product', {
        data
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
    axios
      .post('http://localhost:8080/category', {
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
      .delete('http://localhost:8080/category/delete', {
        data: {
          name: this.state.categoryName
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
      categoryName: 'Other'
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
          <h4>Category:</h4>
          <input type="text" name="category" onChange={this.handleChange} value={this.state.category} />
          <h4>ObjectId:</h4>
          <input type="text" name="objectId" onChange={this.handleChange} value={this.state.objectId} />
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
          <button type="button" className="edit-delete-btn" onClick={() => this.deleteProduct(true)}>
            Delete by Id
          </button>
        </div>
        {/* CATEGORY */}
        <div className="category-edit">
          <h1>Category:</h1>
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
        </div>
      </form>
    );
  }
}
