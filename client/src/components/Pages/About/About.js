import React, { Component } from 'react';
import { Tween } from 'react-gsap';

import './About.scss';
import { getCartSize } from '../../../utils/functions';
import NavBar from '../../NavBar/NavBar';

export default class About extends Component {
  constructor(props) {
    document.title = 'Store';
    super(props);
    this.state = {
      cartSize: 0,
    };
    this.updateCartSize = this.updateCartSize.bind(this);
  }
  updateCartSize(cartSize) {
    this.setState({
      cartSize,
    });
  }
  async componentDidMount() {
    const cartSize = await getCartSize();
    this.setState({
      cartSize,
    });
  }
  render() {
    const { cartSize } = this.state;
    return (
      <div className="about-page">
        <NavBar cartSize={cartSize} updateCartSize={this.updateCartSize} />
        <section className="about-cover">
          <Tween from={{ y: '50vh', opacity: 0 }} to={{ y: 0, opacity: 1 }} duration={1}>
            <div className="about-cover-image" />
          </Tween>
          <Tween
            from={{ x: -500, opacity: 0 }}
            to={{ x: '0', opacity: 1 }}
            delay={0.5}
            duration={1}
          >
            <h1>About us</h1>
          </Tween>
          <Tween
            from={{ x: -100, opacity: 0 }}
            to={{ x: '0', opacity: 1 }}
            delay={1.5}
            duration={1}
          >
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum enim commodi, saepe
              aliquid unde ducimus magnam asperiores temporibus? Accusantium asperiores est aliquam
              et. Officiis enim possimus voluptas natus sequi totam. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Exercitationem veniam eaque eligendi,
            </p>
          </Tween>
        </section>
      </div>
    );
  }
}
