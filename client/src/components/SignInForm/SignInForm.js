import React, { Component } from 'react';
import { Tween } from 'react-gsap';
import axios from 'axios';
import './SignInForm.scss';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const jwtToken = localStorage.getItem('shop-token');
    const api = 'http://localhost:8080/auth/signin';
    const data = {
      username,
      password
    };
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .post(api, data, config)
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('shop-token', res.data.token);
        } else {
          this.setState({
            errorMessage: res.data.errorMessage
          });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    const { username, password, errorMessage } = this.state;
    return (
      <div className="sign-in-page">
        <Tween
          from={{
            y: 100,
            opacity: 0
          }}
          to={{
            y: -300,
            opacity: 1
          }}
          duration={0.5}
        >
          <form className="sign-in-form" onSubmit={this.handleSubmit}>
            <i className="close-icon far fa-times-circle" onClick={() => this.props.close()} />
            <h2>Sign in</h2>
            {errorMessage && <p className="sign-in-error">{this.state.errorMessage}</p>}
            <input
              className={errorMessage === '' ? 'auth-input' : 'auth-input-error'}
              type="text"
              name="username"
              onChange={this.handleChange}
              value={username}
              placeholder="Username"
              required
            />
            <input
              className={errorMessage === '' ? 'auth-input' : 'auth-input-error'}
              type="password"
              name="password"
              onChange={this.handleChange}
              value={password}
              placeholder="Password"
              required
            />
            <p className="a-like" onClick={() => this.props.show('signUp')}>
              Don't have an account?
            </p>
            <button className="form-submit-btn" type="submit">
              Log In
            </button>
          </form>
        </Tween>
      </div>
    );
  }
}
