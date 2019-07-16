import React, { Component } from 'react';
import './Slideshow.scss';
import { image1, image2, image3 } from '../../assets/index.js';
const images = {
  image1,
  image2,
  image3
};
export default class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageNumber: 1,
      image: image1
    };
  }
  changeImage() {
    setTimeout(() => {
      console.log(this.state.imageNumber);
      this.setState({
        imageNumber:
          this.state.imageNumber !== 3 ? this.state.imageNumber + 1 : 1,
        image: images[`image${this.state.imageNumber}`]
      });
    }, 5000);
  }
  componentDidMount() {}
  render() {
    this.changeImage();
    return (
      <div
        className="slideshow"
        style={{ backgroundImage: `url("${this.state.image}")` }}
      >
        {/* {console.log(['image' + this.state.imageNumber])} */}
        {this.props.children}
      </div>
    );
  }
}
