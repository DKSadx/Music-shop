import React, { Component } from 'react';
import axios from 'axios';

import './Edit.scss';
import { baseIp } from '../../../utils/consts';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    document.title = 'Edit';
    this.state = {
      name: '',
      price: '',
      description: '',
      image: '',
      category: 'Choose category:',
      objectId: '',
      categoryName: '',
      isAdmin: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    let value;
    if (e.target.name === 'image') {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    this.setState({
      [e.target.name]: value,
    });
  }

  getCategories() {
    const api = `${baseIp}/category`;
    axios
      .get(api)
      .then(response => {
        this.setState({ categories: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addProduct() {
    const { name, price, description, image, category } = this.state;
    const fd = new FormData();
    fd.append('name', name);
    fd.append('price', price);
    fd.append('description', description);
    fd.append('image', image, image.name);
    fd.append('category', category);
    const api = `${baseIp}/product`;
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .post(api, fd, config)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteProduct(objectId) {
    const api = `${baseIp}/product/delete`;
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    let data;
    if (objectId) {
      data = {
        objectId: this.state.objectId,
      };
    } else {
      data = {
        name: this.state.name,
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
      category: 'Guitars and Bass',
    });
  }
  clearProduct() {
    this.setState({
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      category: '',
    });
  }
  addCategory() {
    const name = this.state.categoryName;
    const api = `${baseIp}/category`;
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
    const api = `${baseIp}/category/delete`;
    const data = {
      name: this.state.categoryName,
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
      categoryName: 'Other',
    });
  }
  componentDidMount() {
    const api = `${baseIp}/auth/isAdmin`;
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .get(api, config)
      .then(res => {
        if (res.data.isAdmin)
          this.setState({
            isAdmin: true,
          });
      })
      .catch(err => {
        console.log(err);
      });
    this.getCategories();
  }

  render() {
    const {
      isAdmin,
      name,
      price,
      description,
      category,
      categories,
      objectId,
      categoryName,
    } = this.state;
    return isAdmin ? (
      <form className="edit-form">
        <div className="product-edit">
          <h1>Product:</h1>
          <h4>Name:</h4>
          <input type="text" name="name" onChange={this.handleChange} value={name} />
          <h4>Price:</h4>
          <input type="text" name="price" onChange={this.handleChange} value={price} />
          <h4>Description:</h4>
          <input type="text" name="description" onChange={this.handleChange} value={description} />
          <h4>Image:</h4>
          <input type="file" name="image" onChange={this.handleChange} />
          <h4>Category:</h4>
          <select name="category" value={category} onChange={this.handleChange}>
            <option>Choose category:</option>
            {categories &&
              categories.map((category, i) => <option key={i}>{category.name}</option>)}
          </select>
          <h4>ObjectId:</h4>
          <input type="text" name="objectId" onChange={this.handleChange} value={objectId} />
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
            value={categoryName}
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
