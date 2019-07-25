import React from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';

import './TrendingMenu.scss';
import trendingBg from '../../assets/images/trending-bg.jpg';

export default function TrendingMenu(props) {
  return (
    <div className={props.className}>
      <img src={trendingBg} id="trendingImage" alt="trending-image" />

      <Controller>
        <Scene
          duration={400}
          offset={-250}
          triggerElement="#trendingImage"
          reverse={true}
          // indicators={{
          //   colorStart: '#fff',
          //   colorEnd: 'blue'
          // }}
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
            <p id="trendingText">Trending now:</p>
            <ul className="trendingMenuItems">
              <li id="trendingItem-1">
                <p>Sony WH-CH500</p>
                <button>Buy now</button>
              </li>
              <li id="trendingItem-2">
                <button>Buy now</button>
                <p>Shure SM57</p>
              </li>
              <li id="trendingItem-3">
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
