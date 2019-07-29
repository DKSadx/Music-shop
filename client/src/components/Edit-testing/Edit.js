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
      imageUrl: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  add() {
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

  delete() {
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
  deleteAll() {
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
  fill() {
    this.setState({
      name: 'guitar',
      price: '34.99',
      description: 'Really good guitar',
      imageUrl: '#'
    });
  }
  render() {
    return (
      <form className="edit-form">
        <div>
          <h4>Name:</h4>
          <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
          <h4>Price:</h4>
          <input type="text" name="price" onChange={this.handleChange} value={this.state.price} />
          <h4>Description:</h4>
          <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
          <h4>ImageUrl:</h4>
          <input type="text" name="imageUrl" onChange={this.handleChange} value={this.state.imageUrl} />
          <button type="button" onClick={() => this.add()}>
            Add
          </button>
          <button type="button" onClick={() => this.fill()}>
            Fill
          </button>
          <button type="button" className="edit-delete-btn" onClick={() => this.delete()}>
            Delete
          </button>
          <button type="button" className="edit-delete-btn" onClick={() => this.deleteAll()}>
            Delete All
          </button>
        </div>
      </form>
    );
  }
}
