import React, { Component } from 'react';

import './Slideshow.scss';
import { slideshowText } from './text';
import { textAnimation } from './animations';

let currentSlide = 1;
export default class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.changeImage = this.changeImage.bind(this);
  }

  changeImage() {
    this.interval = setInterval(() => {
      currentSlide = currentSlide !== 3 ? currentSlide + 1 : 1;
      this.forceUpdate();
    }, 5000);
  }

  componentDidMount() {
    this.changeImage();
  }
  componentWillUnmount() {
    // Stops the setInterval function so it doesn't use resources when not needed
    clearTimeout(this.interval);
  }
  render() {
    return (
      <div className={`slide-${currentSlide}`}>
        {textAnimation(slideshowText, currentSlide - 1)}
      </div>
    );
  }
}
