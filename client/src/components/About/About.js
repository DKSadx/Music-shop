import React from 'react';
import './About.scss';
import NavBar from '../NavBar/NavBar';
import { Tween } from 'react-gsap';

export default function About() {
  return (
    <div className="about-page">
      <NavBar />
      <section className="about-cover">
        <Tween
          from={{
            y: '50vh',
            opacity: 0
          }}
          to={{
            y: 0,
            opacity: 1
          }}
          duration={1}
        >
          <div className="about-cover-image" />
        </Tween>
        <Tween
          from={{
            x: -500,
            opacity: 0
          }}
          to={{
            x: '0',
            opacity: 1
          }}
          delay={0.5}
          duration={1}
        >
          <h1>About us</h1>
        </Tween>
        <Tween
          from={{
            x: -100,
            opacity: 0
          }}
          to={{
            x: '0',
            opacity: 1
          }}
          delay={1.5}
          duration={1}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum enim commodi, saepe aliquid unde ducimus magnam asperiores temporibus?
            Accusantium asperiores est aliquam et. Officiis enim possimus voluptas natus sequi totam. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Exercitationem veniam eaque eligendi,
          </p>
        </Tween>
      </section>
    </div>
  );
}
