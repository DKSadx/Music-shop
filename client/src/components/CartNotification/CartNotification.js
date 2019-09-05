import React, { Component } from 'react';
import { Tween, Timeline } from 'react-gsap';

import './CartNotification.scss';
import cartIcon from '../../assets/images/cart-plus.svg';

export default class CartNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // timeline is now a TimelineMax class instance, enables original gsap instead of react-gsap
    const timeline = this.timeline.getGSAP();
    this.setState({
      timeline
    });
  }

  render() {
    // By default animation is triggered once, .restart() triggers it every time the component is rendered
    this.state.timeline && this.state.timeline.restart();
    return (
      <Timeline
        target={
          <div className="cart-notification">
            <img src={cartIcon} alt="Added to cart icon" />
            <p>Product was added to cart.</p>
          </div>
        }
        ref={ref => (this.timeline = ref)}
      >
        <Tween from={{ opacity: 0, x: '70vw', y: -100 }} to={{ opacity: 1, y: 50 }} duration={1} />
        <Tween to={{ opacity: 0, y: -100 }} delay={0.5} />
      </Timeline>
    );
  }
}
