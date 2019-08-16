import React from 'react';
import { Tween } from 'react-gsap';

export const textAnimation = (animatedText, slideNumber) => {
  const animations = [
    <Tween
      from={{
        x: -500,
        y: 200,
        opacity: 0
      }}
      to={{
        x: '10vw',
        y: '25vh',
        opacity: 1,
        color: '#333'
      }}
    >
      {animatedText[slideNumber]}
    </Tween>,
    <Tween
      from={{
        x: -500,
        y: 200,
        opacity: 0
      }}
      to={{
        x: '52vw',
        y: '70vh',
        opacity: 1,
        color: 'white'
      }}
    >
      {animatedText[slideNumber]}
    </Tween>,
    <Tween
      from={{
        x: -500,
        y: 200,
        opacity: 0
      }}
      to={{
        x: '40vw',
        y: '30vh',
        opacity: 1,
        color: 'black'
      }}
    >
      {animatedText[slideNumber]}
    </Tween>
  ];
  return animations[slideNumber];
};
