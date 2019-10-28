import React from 'react';

import './Footer.scss';
import fbIcon from '../../assets/icons/facebook.png';
import instaIcon from '../../assets/icons/instagram.png';
import twitterIcon from '../../assets/icons/twitter.png';
import ytIcon from '../../assets/icons/youtube.png';

export default function Footer() {
  return (
    <footer>
      <ul className="footer-social">
        <h4>Follow us</h4>
        <div className="footer-icons">
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={fbIcon} alt="facebook icon" />
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instaIcon} alt="instagram icon" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="twitter icon" />
            </a>
          </li>
          <li>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src={ytIcon} alt="youtube icon" />
            </a>
          </li>
        </div>
      </ul>
      <ul className="footer-info">
        <li>
          <a href="https://projects.darkokojovic.com/music-shop">Contact Us</a>
        </li>
        <li>
          <a href="https://projects.darkokojovic.com/music-shop">Shipping</a>
        </li>
        <li>
          <a href="https://projects.darkokojovic.com/music-shop">FAQs</a>
        </li>
        <li>
          <a href="https://projects.darkokojovic.com/music-shop">Payment methods</a>
        </li>
        <li>
          <a href="https://projects.darkokojovic.com/music-shop">Cookies</a>
        </li>
        <li>
          <a href="https://projects.darkokojovic.com/music-shop">Privacy Policy</a>
        </li>
        <li>
          <a href="https://projects.darkokojovic.com/music-shop">Terms of Service</a>
        </li>
      </ul>
      <div className="footer-important">
        <h3>Important!</h3>
        <p>
          If the layout is a bit messed up try disabling adblock because it detects social sites
          names in classes, ids, alts and removes those elements
        </p>
      </div>
    </footer>
  );
}
