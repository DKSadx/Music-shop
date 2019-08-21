import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './NavBar.scss';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from '../SignInForm/SignInForm';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpForm: false,
      signInForm: false,
      isLoggedIn: false
    };
    this.scrollToTop = this.scrollToTop.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  showPopUp(type) {
    this.setState({
      signInForm: type === 'signIn' ? true : false,
      signUpForm: type === 'signUp' ? true : false
    });
  }
  closePopUp() {
    this.setState({
      signInForm: false,
      signUpForm: false
    });
  }
  componentDidMount() {
    const jwtToken = localStorage.getItem('shop-token');
    const api = 'http://localhost:8080/auth/isauth';
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    axios
      .get(api, config)
      .then(res => {
        if (res.data.isAuth) {
          this.setState({
            isLoggedIn: true
          });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    const { isLoggedIn } = this.state;
    return (
      <div className="nav-bar-container">
        <ul className="main-nav-bar">
          <li id="logo">
            <Link to="/">Logo</Link>
          </li>
          <ul className="main-nav-bar-center">
            <li>
              <Link to="/" onClick={() => this.scrollToTop()}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/store" onClick={() => this.scrollToTop()}>
                Store
              </Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
          </ul>
          <ul className="main-nav-bar-end">
            {isLoggedIn ? (
              <>
                <i className="cart-icon fas fa-shopping-cart">
                  <i className="cart-icon-number">2</i>
                </i>
                <i className="user-icon fas fa-user">
                  <ul className="user-dropdown-menu">
                    <li>
                      <Link className="dropdown-text" to="/account">
                        My account
                        <i className="fas fa-cog" />
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-text" to="/logout">
                        Log out
                        <i className="fas fa-sign-out-alt" />
                      </Link>
                    </li>
                  </ul>
                </i>
              </>
            ) : (
              <>
                <li onClick={async () => await this.setState({ signInForm: true, signUpForm: false })}>SIGN IN</li>
                <li>
                  <button className="signup-btn" onClick={async () => await this.setState({ signUpForm: true, signInForm: false })}>
                    SIGN UP
                  </button>
                </li>
              </>
            )}
          </ul>
        </ul>
        {this.state.signUpForm ? <SignUpForm show={this.showPopUp} close={this.closePopUp} /> : <></>}
        {this.state.signInForm ? <SignInForm show={this.showPopUp} close={this.closePopUp} /> : <></>}
      </div>
    );
  }
}
