import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './NavBar.scss';
import './HamburgerMenu.scss';
import SignUpForm from '../Modals/SignUpForm/SignUpForm';
import SignInForm from '../Modals/SignInForm/SignInForm';
import Cart from '../Modals/Cart/Cart';
import { baseIp } from '../../utils/consts';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      signUpForm: false,
      signInForm: false,
      isLoggedIn: false,
      isJWTValid: true, // Prevents showing sign in/up buttons before receiving data if the user is logged in
      showCart: false,
      cartSize: this.props.cartSize,
    };
    this.scrollToTop = this.scrollToTop.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    const jwtToken = localStorage.getItem('shop-token');
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    const api = `${baseIp}/cart/getCartSize`;
    axios
      .get(api, config)
      .then(res => {
        if (res.data.cartSize >= 0) {
          this.setState({
            cartSize: res.data.cartSize,
            isLoggedIn: true,
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isJWTValid: false,
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cartSize: nextProps.cartSize,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  showPopUp(type) {
    this.setState({
      signInForm: type === 'signIn' ? true : false,
      signUpForm: type === 'signUp' ? true : false,
      showCart: type === 'cart' ? true : false,
    });
  }

  closePopUp() {
    this.setState({
      signInForm: false,
      signUpForm: false,
      showCart: false,
    });
  }

  logout() {
    window.localStorage.removeItem('shop-token');
    window.location.reload();
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width, isLoggedIn, isJWTValid, cartSize } = this.state;
    return (
      <div className="nav-bar-container">
        <ul className="main-nav-bar">
          {width > 767 ? (
            <>
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
            </>
          ) : (
            <nav role="navigation">
              <div id="menuToggle">
                <input type="checkbox" />
                {/* Hamburger menu lines */}
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
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
              </div>
            </nav>
          )}
          <ul className="main-nav-bar-end">
            {/* Checks if the jwt token exists/isValid */}
            {isLoggedIn ? (
              <>
                <i
                  className="fas fa-shopping-cart cart-icon "
                  onClick={() =>
                    this.setState({ signInForm: false, signUpForm: false, showCart: true })
                  }
                >
                  <i className="cart-icon-number">{cartSize}</i>
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
                  <li
                    onClick={() =>
                      this.setState({ signInForm: true, signUpForm: false, showCart: false })
                    }
                  >
                    SIGN IN
                  </li>
                  <li>
                    <button
                      className="signup-btn"
                      onClick={() =>
                        this.setState({ signUpForm: true, signInForm: false, showCart: false })
                      }
                    >
                      SIGN UP
                    </button>
                  </li>
                </>
              )
            )}
          </ul>
        </ul>
        {/* Modal windows */}
        {this.state.signUpForm && <SignUpForm show={this.showPopUp} close={this.closePopUp} />}
        {this.state.signInForm && <SignInForm show={this.showPopUp} close={this.closePopUp} />}
        {this.state.showCart && (
          <Cart close={this.closePopUp} updateCartSize={this.props.updateCartSize} />
        )}
      </div>
    );
  }
}
