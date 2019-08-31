import React, { Component } from 'react';
import axios from 'axios';

import './Account.scss';
import emailRegex from '../../utils/consts';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      rNewPassword: '',
      errors: {
        username: '',
        email: '',
        password: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  changeUsername(e) {
    e.preventDefault();
    const api = 'http://localhost:8080/account/changeUsername';
    const data = {
      newUsername: this.state.username
    };
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .post(api, data, config)
      .then(res => {
        res.data.errorMessage
          ? this.setState({
              errors: {
                ...this.state.errors,
                username: res.data.errorMessage
              }
            })
          : this.setState({
              errors: {
                ...this.state.errors,
                username: 'Changed'
              }
            });
      })
      .catch(err => console.log(err));
  }
  changeEmail(e) {
    e.preventDefault();
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        errors: {
          ...this.state.errors,
          email: 'Email is not valid!'
        }
      });
    } else {
      const api = 'http://localhost:8080/account/changeEmail';
      const data = {
        newEmail: this.state.email
      };
      const jwtToken = localStorage.getItem('shop-token');
      const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
      axios
        .post(api, data, config)
        .then(res => {
          console.log(res.data);
          res.data.errorMessage
            ? this.setState({
                errors: {
                  ...this.state.errors,
                  email: res.data.errorMessage
                }
              })
            : this.setState({
                errors: {
                  ...this.state.errors,
                  email: 'Changed'
                }
              });
        })
        .catch(err => console.log(err));
    }
  }
  changePassword(e) {
    e.preventDefault();
    const { oldPassword, newPassword, rNewPassword } = this.state;
    if (newPassword !== rNewPassword) {
      this.setState({
        errors: {
          ...this.state.errors,
          password: "Passwords don't match!"
        }
      });
    } else {
      const api = 'http://localhost:8080/account/changePassword';
      const data = {
        oldPassword,
        newPassword
      };
      const jwtToken = localStorage.getItem('shop-token');
      const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
      axios
        .post(api, data, config)
        .then(res => {
          res.data.errorMessage
            ? this.setState({
                errors: {
                  ...this.state.errors,
                  password: res.data.errorMessage
                }
              })
            : this.setState({
                errors: {
                  ...this.state.errors,
                  password: 'Changed'
                }
              });
        })
        .catch(err => console.log(err));
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const { username, email, oldPassword, newPassword, rNewPassword, errors } = this.state;
    return (
      <div className="account-page">
        <section className="account-page-icons" onClick={this.props.history.goBack}>
          <i className="fas fa-arrow-left" />
          <i className="fas fa-home" />
        </section>
        <form className="account-form">
          <h1 className="account-form-header">Account settings</h1>
          <div className="account-form-username">
            <h3>Change username:</h3>
            <input name="username" type="text" placeholder="New username" onChange={this.handleChange} value={username} />
            <button onClick={this.changeUsername.bind(this)}>Change username</button>
          </div>
          {errors.username === '' ? (
            <p>Please enter new username.</p>
          ) : errors.username === 'Changed' ? (
            <p className="account-changed-success">Username has been changed.</p>
          ) : (
            <p className="account-changed-error">{errors.username}</p>
          )}
          <div className="account-form-email">
            <h3>Change email:</h3>
            <input name="email" type="text" placeholder="New email" onChange={this.handleChange} value={email} />
            <button onClick={this.changeEmail.bind(this)}>Change email</button>
          </div>
          {errors.email === '' ? (
            <p>Please enter a new email.</p>
          ) : errors.email === 'Changed' ? (
            <p className="account-changed-success">Email has been changed.</p>
          ) : (
            <p className="account-changed-error">{errors.email}</p>
          )}
          <div className="account-form-password">
            <h3>Change password:</h3>
            <input name="oldPassword" type="password" placeholder="Old password" onChange={this.handleChange} value={oldPassword} />
            <input name="newPassword" type="password" placeholder="New password" onChange={this.handleChange} value={newPassword} />
            <input name="rNewPassword" type="password" placeholder="Repeat new password" onChange={this.handleChange} value={rNewPassword} />
            <button onClick={this.changePassword.bind(this)}>Change password</button>
          </div>
          {errors.password === '' ? (
            <p>Please enter your current password.</p>
          ) : errors.password === 'Changed' ? (
            <p className="account-changed-success">Password has been changed.</p>
          ) : (
            <p className="account-changed-error">{errors.password}</p>
          )}
        </form>
      </div>
    );
  }
}
