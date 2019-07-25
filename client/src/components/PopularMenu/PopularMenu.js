import React from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';
import { Back } from 'gsap/EasePack';

import './PopularMenu.scss';
import data from './popularMenuData.json';

export default function PopularMenu(props) {
  // Generating <li> items
  const createItems = () => {
    return data.map((x, i) => (
      <li key={i} style={{ backgroundImage: `url("${x.url}")` }}>
        <div className="onHoverDiv" />
        <button className="popularBuyBtn">Buy now</button>
        <button className="popularDetailsBtn">Details</button>
        <a>{x.name}</a>
      </li>
    ));
  };
  return (
    <div className={props.className}>
      <h3>Popular products:</h3>
      <Controller>
        <Scene
          duration={1000}
          offset={-100}
          triggerElement={`.${props.className}`}
          reverse={true}
          // indicators={{
          //   colorStart: 'red',
          //   colorEnd: 'green'
          // }}
        >
          <Tween
            // Wraps all <li> tags that are dynamically created
            wrapper={<ul className="PI-grid" />}
            staggerFrom={{
              opacity: 0,
              cycle: {
                x: i => -(i + 1) * 50
              }
              // ease: Back.easeOut
            }}
            stagger={0.3}
          >
            {createItems()}
          </Tween>
        </Scene>
      </Controller>
    </div>
  );
}
