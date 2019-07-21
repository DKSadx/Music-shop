import React from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';

import './TrendingMenu.scss';
import trendingBg from '../../assets/images/trending-bg.jpg';

export default function TrendingMenu(props) {
  return (
    <div className={props.className}>
      <img src={trendingBg} id="trendingImage" alt="" />
      <p id="trendingText">Trending now:</p>
      <Controller>
        <Scene
          duration={400}
          offset={-150}
          triggerElement="#trendingImage"
          reverse={true}
          indicators={{
            colorStart: '#fff',
            colorEnd: 'blue'
          }}
        >
          <Tween
            from={{
              visibility: 'hidden',
              y: 100,
              opacity: 0
            }}
            to={{
              visibility: 'visible',
              y: 0,
              opacity: 1
            }}
          >
            <ul className="trendingMenuItems">
              <li id="trendingItem-1">
                <button>Buy now</button>
              </li>
              <li id="trendingItem-2">
                <button>Buy now</button>
              </li>
              <li id="trendingItem-3">
                <button>Buy now</button>
              </li>
            </ul>
          </Tween>
        </Scene>
      </Controller>
    </div>
  );
}
