import React from 'react';

import './Footer.scss';

export default function Footer() {
  return (
    <footer>
      {/* <h4>Social:</h4>
      <h4>Info:</h4> */}
      <ul className="footer-social">
        <h4>Follow us</h4>
        <li>
          <a href="https://facebook.com" target="_blank">
            <img src="/icons/facebook.png" />
          </a>
        </li>
        <li>
          <a href="https://instagram.com" target="_blank">
            <img src="/icons/instagram.png" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com" target="_blank">
            <img src="/icons/twitter.png" />
          </a>
        </li>
        <li>
          <a href="https://youtube.com" target="_blank">
            <img src="/icons/youtube.png" />
          </a>
        </li>
      </ul>
      <ul className="footer-info">
        <li>
          <a href="#">Contact Us</a>
        </li>
        <li>
          <a href="#">Shipping</a>
        </li>
        <li>
          <a href="#">FAQs</a>
        </li>
        <li>
          <a href="#">Payment methods</a>
        </li>
        <li>
          <a href="#">Cookies</a>
        </li>
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Terms of Service</a>
        </li>
      </ul>
      <div className="footer-important">
        <h3>Lorem ipsum!</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, atque earum quidem mollitia explicabo iure dolore, fuga temporibus quam
          labore nemo! Sunt officiis cupiditate saepe inventore? Voluptates hic nulla tenetur!
        </p>
      </div>
    </footer>
  );
}
