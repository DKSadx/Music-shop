import React, { Component } from 'react';
import { Tween } from 'react-gsap';
import axios from 'axios';
import './SignUpForm.scss';

import emailRegex from '../variables';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: '',
        type: 'string',
        required: true,
        errorMessage: ''
      },
      email: {
        value: '',
        type: 'string',
        required: true,
        errorMessage: ''
      },
      password: {
        value: '',
        type: 'string',
        required: true,
        errorMessage: ''
      },
      repeatedPassword: {
        value: '',
        type: 'string',
        required: true,
        errorMessage: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validation() {
    let isValid = true;
    const { username, email, password, repeatedPassword } = this.state;
    const errorMessages = {
      email: '',
      password: '',
      repeatedPassword: ''
    };
    if (password.value !== repeatedPassword.value) {
      isValid = false;
      errorMessages.repeatedPassword = "Passwords don't match!";
    }
    if (password.value.length < 6) {
      isValid = false;
      errorMessages.password = 'Password is too short!';
    }
    if (!emailRegex.test(email.value)) {
      isValid = false;
      errorMessages.email = 'Email is not valid!';
    }
    if (!isValid) {
      this.setState({
        email: {
          ...this.state.email,
          errorMessage: errorMessages.email
        },
        password: {
          ...this.state.password,
          errorMessage: errorMessages.password
        },
        repeatedPassword: {
          ...this.state.repeatedPassword,
          errorMessage: errorMessages.repeatedPassword
        }
      });
    }
    return isValid;
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: {
        ...this.state[e.target.name],
        value: e.target.value
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validation();
    if (isValid) {
      // const { username, email, password } = this.state;
      // axios
      //   .put('http://localhost:8080/auth/signup', {
      //     username,
      //     email,
      //     password
      //   })
      //   .then(response => console.log(response))
      //   .catch(err => console.log(err));
    }
  }

  render() {
    const { username, email, password, repeatedPassword } = this.state;
    return (
      <div className="sign-up-page">
        <Tween
          from={{
            y: 100,
            opacity: 0
          }}
          to={{
            y: -350,
            opacity: 1
          }}
          duration={0.5}
        >
          <form className="sign-up-form" onSubmit={this.handleSubmit}>
            <i className="far fa-times-circle" onClick={() => this.props.close()} />
            <h2>Sign Up</h2>
            {/* prettier-ignore */}
            <input
              className="auth-input"
              type="text"
              name="username"
              onChange={this.handleChange}
              value={username.value}
              placeholder="Username"
              required
            />
            <p className="input-message">This will be your username. It will be public for everyone.</p>
            {/* prettier-ignore */}
            <input
              className={email.errorMessage === '' ? 'auth-input' : 'auth-input-error'}
              type="text"
              name="email"
              onChange={this.handleChange}
              value={email.value}
              placeholder="Email"
              required
            />
            {email.errorMessage === '' ? (
              <p className="input-message">We need your email address to verify your account.</p>
            ) : (
              <p className="input-message-error">{email.errorMessage}</p>
            )}
            {/* prettier-ignore */}
            <input
              className={password.errorMessage === '' ? 'auth-input' : 'auth-input-error'}
              type="password"
              name="password"
              onChange={this.handleChange}
              value={password.value}
              placeholder="Password"
              required
            />
            {password.errorMessage === '' ? (
              <p className="input-message">Password needs to be at least 6 character long.</p>
            ) : (
              <p className="input-message-error">{password.errorMessage}</p>
            )}
            <input
              className={repeatedPassword.errorMessage === '' ? 'auth-input' : 'auth-input-error'}
              type="password"
              name="repeatedPassword"
              onChange={this.handleChange}
              value={repeatedPassword.value}
              placeholder="Repeat password"
              required
            />
            {repeatedPassword.errorMessage === '' ? (
              <p className="input-message">Repeat the same password.</p>
            ) : (
              <p className="input-message-error">{repeatedPassword.errorMessage}</p>
            )}
            <p className="a-like" onClick={() => this.props.show('signIn')}>
              Already have an account?
            </p>
            <button className="form-submit-btn" type="submit">
              Sign Up
            </button>
          </form>
        </Tween>
      </div>
    );
  }
}
