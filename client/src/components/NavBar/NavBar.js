import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './NavBar.scss';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from '../SignInForm/SignInForm';
import Cart from '../Cart/Cart';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpForm: false,
      signInForm: false,
      isLoggedIn: false,
      isJWTValid: true, // Prevents showing sign in/up buttons before receiving data if the user is logged in
      showCart: false
    };
    this.scrollToTop = this.scrollToTop.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
    this.logout = this.logout.bind(this);
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  showPopUp(type) {
    this.setState({
      signInForm: type === 'signIn' ? true : false,
      signUpForm: type === 'signUp' ? true : false,
      showCart: type === 'cart' ? true : false
    });
  }
  closePopUp() {
    this.setState({
      signInForm: false,
      signUpForm: false,
      showCart: false
    });
  }
  logout() {
    window.localStorage.removeItem('shop-token');
    window.location.reload();
  }
  componentDidMount() {
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    const api = 'http://localhost:8080/auth/isauth';
    axios
      .get(api, config)
      .then(res => {
        if (res.data.isAuth) {
          this.setState({
            isLoggedIn: true
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isJWTValid: false
        });
      });
  }
  render() {
    const { isLoggedIn, isJWTValid } = this.state;
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
            {/* Checks if the jwt token exists/isValid */}
            {isLoggedIn ? (
              <>
                <i className="cart-icon fas fa-shopping-cart" onClick={() => this.setState({ signInForm: false, signUpForm: false, showCart: true })}>
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
                    <li className="dropdown-text" onClick={() => this.logout()}>
                      Log out
                      <i className="fas fa-sign-out-alt" />
                    </li>
                  </ul>
                </i>
              </>
            ) : (
              // Prevents showing sign in/up buttons before receiving data if the user is logged in
              !isJWTValid && (
                <>
                  <li onClick={() => this.setState({ signInForm: true, signUpForm: false, showCart: false })}>SIGN IN</li>
                  <li>
                    <button className="signup-btn" onClick={() => this.setState({ signUpForm: true, signInForm: false, showCart: false })}>
                      SIGN UP
                    </button>
                  </li>
                </>
              )
            )}
          </ul>
        </ul>
        {/* Modal windows */}
        {this.state.signUpForm ? <SignUpForm show={this.showPopUp} close={this.closePopUp} /> : <></>}
        {this.state.signInForm ? <SignInForm show={this.showPopUp} close={this.closePopUp} /> : <></>}
        {this.state.showCart ? <Cart close={this.closePopUp} /> : <></>}
      </div>
    );
  }
}
