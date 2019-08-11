import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = props => {
  return (
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
        <li>
          <Link to="/sign-in">SIGN IN</Link>
        </li>
        <li>
          <Link to="/sign-up">
            <button className="signup-btn">SIGN UP</button>
          </Link>
        </li>
      </ul>
    </ul>
  );
};

export default NavBar;
