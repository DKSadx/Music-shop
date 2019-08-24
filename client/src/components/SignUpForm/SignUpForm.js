import React, { Component } from 'react';
import { Tween } from 'react-gsap';
import axios from 'axios';
import './SignUpForm.scss';

import Spinner from '../Spinner/Spinner';
import delay from '../../utils/functions';
import emailRegex from '../../utils/consts';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    let isSignUpSuccessful = false;
    this.state = {
      username: {
        value: '',
        errorMessage: ''
      },
      email: {
        value: '',
        errorMessage: ''
      },
      password: {
        value: '',
        errorMessage: ''
      },
      repeatedPassword: {
        value: '',
        errorMessage: ''
      },
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Client side validation
  validation() {
    let isValid = true;
    const { email, password, repeatedPassword } = this.state;
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
    // If something is not valid, displays error messages
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
      this.setState({
        isLoading: true
      });
      // Displays spinner for 1.5s
      delay(1500).then(() => {
        const { username, email, password } = this.state;
        axios
          .post('http://localhost:8080/auth/signup', {
            username: username.value,
            email: email.value,
            password: password.value
          })
          .then(res => {
            // Checks if server side validation has errors
            // If it has errors, it displays error messages. Else it redirects to SignUpSuccessful page
            if (res.data.errorMessages) {
              const { username, email, password } = res.data.errorMessages;
              this.setState({
                username: {
                  ...this.state.username,
                  errorMessage: username
                },
                email: {
                  ...this.state.email,
                  errorMessage: email
                },
                password: {
                  ...this.state.password,
                  errorMessage: password
                },
                isLoading: false
              });
            } else if (res.data.isSuccessful) {
              this.isSignUpSuccessful = true;
              this.forceUpdate();
            }
          })
          .catch(err => {
            this.setState({
              isLoading: false
            });
            console.log(err);
          });
      });
    }
  }

  signInRedirect() {
    //  Waits 2s and redirects to log in page
    setTimeout(() => {
      this.props.show('signIn');
    }, 2000);
  }

  render() {
    const { username, email, password, repeatedPassword, isLoading } = this.state;
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
          <form autoComplete="off" className="sign-up-form" onSubmit={this.handleSubmit}>
            <i className="close-icon far fa-times-circle" onClick={() => this.props.close()} />
            {!this.isSignUpSuccessful ? (
              <>
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
                {username.errorMessage === '' ? (
                  <p className="input-message">This will be your username. It will be public for everyone.</p>
                ) : (
                  <p className="input-message-error">{username.errorMessage}</p>
                )}
                {/* prettier-ignore */}
                <input
                  className={email.errorMessage === '' ? 'auth-input' : 'auth-input-error'}
                  autoComplete="off"
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
                {isLoading ? (
                  <Spinner />
                ) : (
                  <button className="form-submit-btn" type="submit">
                    Sign Up
                  </button>
                )}
              </>
            ) : (
              <div className="signup-successful">
                <h1>Sign-up completed</h1>
                <i className="check-icon far fa-check-circle" />
                <p>
                  Thank you for signing up.
                  <br />
                  Please wait...
                </p>
                {this.signInRedirect()}
              </div>
            )}
          </form>
        </Tween>
      </div>
    );
  }
}
