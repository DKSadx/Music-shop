import React from 'react';
import { Tween } from 'react-gsap';

import './storeCover.scss';

export default function StoreCover() {
  return (
    <>
      <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={2}>
        <div className="shopCover">
          <h3>Welcome to the store</h3>
        </div>
      </Tween>
    </>
  );
}
