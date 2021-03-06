import React, { Component } from 'react';
import { Tween } from 'react-gsap';
import axios from 'axios';

import './SignInForm.scss';
import Spinner from '../../Spinner/Spinner';
import { delay } from '../../../utils/functions';
import { baseIp } from '../../../utils/consts';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    // Shows spinner for 1.5s -> validates JWT
    delay(1500).then(() => {
      const { username, password } = this.state;
      const api = `${baseIp}/auth/signin`;
      const data = {
        username,
        password,
      };
      axios
        .post(api, data)
        .then(res => {
          if (res.data.token) {
            localStorage.setItem('shop-token', res.data.token);
            // Reloads page
            window.location.reload();
          } else {
            this.setState({
              errorMessage: res.data.errorMessage,
              isLoading: false,
            });
          }
        })
        .catch(err => console.log(err));
    });
  }

  render() {
    const { username, password, errorMessage, isLoading } = this.state;
    const { close, show } = this.props;
    return (
      <div className="sign-in-page">
        <Tween from={{ y: 100, opacity: 0 }} to={{ y: -300, opacity: 1 }} duration={0.5}>
          <form autoComplete="off" className="sign-in-form" onSubmit={this.handleSubmit}>
            <div className="close-icon" onClick={() => close()}>
              <i className="far fa-times-circle" />
            </div>
            <h2>Sign in</h2>
            {errorMessage && <p className="sign-in-error">{errorMessage}</p>}
            <input
              className={errorMessage === '' ? 'auth-input' : 'auth-input-error'}
              type="text"
              name="username"
              onChange={this.handleChange}
              value={username}
              placeholder="Username"
              spellCheck={false}
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
            <p className="a-like" onClick={() => show('signUp')}>
              Don't have an account?
            </p>
            <span id="test-account">Test account (username: test, password: test12)</span>
            {isLoading ? (
              <div className="auth-loading">
                <Spinner />
              </div>
            ) : (
              <button className="form-submit-btn" type="submit">
                Log In
              </button>
            )}
          </form>
        </Tween>
      </div>
    );
  }
}
