import React, { Component } from 'react';

import './Slideshow.scss';
import { slideshowText } from './text';
import { textAnimation } from './animations';
import { image1, image2, image3 } from '../../assets/index.js';
const images = {
  image1,
  image2,
  image3
};
let currentSlide = {
  imageNumber: 1,
  image: image1
};
export default class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.changeImage = this.changeImage.bind(this);
  }

  changeImage() {
    this.interval = setInterval(() => {
      currentSlide.imageNumber =
        currentSlide.imageNumber !== 3 ? currentSlide.imageNumber + 1 : 1;
      currentSlide.image = images[`image${currentSlide.imageNumber}`];
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
      <div
        className="slideshow"
        style={{ backgroundImage: `url("${currentSlide.image}")` }}
      >
        {this.props.navbar}
        {console.log(currentSlide)}
        {textAnimation(slideshowText, currentSlide.imageNumber - 1)}
      </div>
    );
  }
}

// this.animation = (
//   <Tween
//     from={{
//       x: -500,
//       y: 200,
//       opacity: 0
//     }}
//     to={{
//       x: 200,
//       y: 200,
//       opacity: 1,
//       repeat: -1,
//       // repeatDelay: 4,
//       yoyo: true
//       // 'font-size': 30
//     }}
//     yoyo={true}
//     stagger={1}
//     repeatDelay={3}
//   >
//     {currentSlide.animatedText[currentSlide.imageNumber - 1]}
//   </Tween>
// );
