import React from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';

import './TrendingMenu.scss';
import trendingBg from '../../assets/images/trending-bg.jpg';

export default function TrendingMenu(props) {
  return (
    // class=trending-menu
    <div className={props.className}>
      <img src={trendingBg} id="trending-image" alt="Trending image" />

      <Controller>
        <Scene
          duration={400}
          offset={-100}
          triggerElement="#trending-image"
          // reverse={false}
          // indicators={{
          //   colorStart: '#fff',
          //   colorEnd: 'blue'
          // }}
        >
          <Tween
            staggerFrom={{
              y: 300,
              opacity: 0
            }}
            staggerTo={{
              y: 0,
              opacity: 1
            }}
          >
            <p id="trending-text">Trending now:</p>
            <ul className="trending-menu-items">
              <li id="trending-item-1" onClick={() => (window.location.href = '#')}>
                <p>Sony WH-CH500</p>
              </li>
              <li id="trending-item-2" onClick={() => (window.location.href = '#')}>
                <p>Shure SM57</p>
              </li>
              <li id="trending-item-3" onClick={() => (window.location.href = '#')}>
                <p>Beoplay H9</p>
              </li>
            </ul>
          </Tween>
        </Scene>
      </Controller>
    </div>
  );
}
