import React from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';

import './TrendingMenu.scss';
import trendingBg from '../../assets/images/trending-bg.jpg';

export default function TrendingMenu(props) {
  return (
    <div className={props.className}>
      <img src={trendingBg} id="trending-image" alt="Trending image" />

      <Controller>
        <Scene
          duration={500}
          offset={-100}
          triggerElement="#trending-image"
          // reverse={false}
          // indicators={{
          //   colorStart: '#fff',
          //   colorEnd: 'blue'
          // }}
        >
          <Tween
            from={{
              y: 300,
              opacity: 0
            }}
            to={{
              y: 0,
              opacity: 1
            }}
            // immediateRender={false}
          >
            <p id="trending-text">Trending now:</p>
            <ul className="trending-menu-items">
              <li id="trending-item-1">
                <p>Sony WH-CH500</p>
                <button>Buy now</button>
              </li>
              <li id="trending-item-2">
                <button>Buy now</button>
                <p>Shure SM57</p>
              </li>
              <li id="trending-item-3">
                <button>Buy now</button>
                <p>Beoplay H9</p>
              </li>
            </ul>
          </Tween>
        </Scene>
      </Controller>
    </div>
  );
}
