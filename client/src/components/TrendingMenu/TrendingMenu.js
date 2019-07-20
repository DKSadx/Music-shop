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
          duration={600}
          offset={-100}
          triggerElement="#trendingImage"
          reverse={true}
          indicators={{
            colorStart: '#fff',
            colorEnd: 'blue'
          }}
        >
          <Tween
            from={{
              // y: -document.body.scrollHeight / 25,
              visibility: 'hidden',
              opacity: 0
            }}
            to={{
              // y: -document.body.scrollHeight / 20,
              visibility: 'visible',
              opacity: 1
            }}
          >
            <ul className="trendingMenuItems">
              <li id="trendingItem-1" />
              <li id="trendingItem-2" />
              <li id="trendingItem-3" />
            </ul>
          </Tween>
        </Scene>
      </Controller>
    </div>
  );
}
