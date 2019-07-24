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
        y: '10vh',
        opacity: 1,
        color: 'black'
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
        x: '60vw',
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
        x: '45vw',
        y: '20vh',
        opacity: 1,
        color: 'black'
      }}
    >
      {animatedText[slideNumber]}
    </Tween>
  ];
  return animations[slideNumber];
};
