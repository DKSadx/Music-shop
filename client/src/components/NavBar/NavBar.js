import React from 'react';
import './NavBar.scss';

const NavBar = props => {
  return (
    <ul className="main-nav-bar">
      <li id="logo">Logo</li>
      <ul className="center-main-nav-bar">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Store</a>
        </li>
        <li>
          <a href="#">About us</a>
        </li>
      </ul>
      <ul className="end-main-nav-bar">
        <li>
          <a href="#">SIGN IN</a>
        </li>
        <li>
          <a href="#">SIGN UP</a>
        </li>
      </ul>
    </ul>
  );
};

export default NavBar;
