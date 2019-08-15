import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from '../SignInForm/SignInForm';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpForm: false,
      signInForm: false
    };
    this.closePopUp = this.closePopUp.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
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
  render() {
    return (
      <>
        <ul className="main-nav-bar">
          <li id="logo">
            <Link to="/">Logo</Link>
          </li>
          <ul className="main-nav-bar-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/store">Store</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
          </ul>
          <ul className="main-nav-bar-end">
            <li onClick={async () => await this.setState({ signInForm: true, signUpForm: false })}>SIGN IN</li>
            <li>
              <button className="signup-btn" onClick={async () => await this.setState({ signUpForm: true, signInForm: false })}>
                SIGN UP
              </button>
            </li>
          </ul>
        </ul>
        {this.state.signUpForm ? <SignUpForm show={this.showPopUp} close={this.closePopUp} /> : <></>}
        {this.state.signInForm ? <SignInForm show={this.showPopUp} close={this.closePopUp} /> : <></>}
      </>
    );
  }
}
