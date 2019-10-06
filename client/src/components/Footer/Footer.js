import React from 'react';

import './Footer.scss';

export default function Footer() {
  return (
    <footer>
      <ul className="footer-social">
        <h4>Follow us</h4>
        <div className="footer-icons">
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.png" alt="facebook icon" />
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.png" alt="instagram icon" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/twitter.png" alt="twitter icon" />
            </a>
          </li>
          <li>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/youtube.png" alt="youtube icon" />
            </a>
          </li>
        </div>
      </ul>
      <ul className="footer-info">
        <li>
          <a href="http://localhost:3000/">Contact Us</a>
        </li>
        <li>
          <a href="http://localhost:3000/">Shipping</a>
        </li>
        <li>
          <a href="http://localhost:3000/">FAQs</a>
        </li>
        <li>
          <a href="http://localhost:3000/">Payment methods</a>
        </li>
        <li>
          <a href="http://localhost:3000/">Cookies</a>
        </li>
        <li>
          <a href="http://localhost:3000/">Privacy Policy</a>
        </li>
        <li>
          <a href="http://localhost:3000/">Terms of Service</a>
        </li>
      </ul>
      <div className="footer-important">
        <h3>Lorem ipsum!</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, atque earum quidem
          mollitia explicabo iure dolore, fuga temporibus quam labore nemo! Sunt officiis cupiditate
          saepe inventore? Voluptates hic nulla tenetur!
        </p>
      </div>
    </footer>
  );
}
