import React, { Component, lazy, Suspense } from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';

import './App.scss';
import NavBar from './components/NavBar/NavBar';
import TrendingMenu from './components/TrendingMenu/TrendingMenu';
import Slideshow from './components/Slideshow/Slideshow';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0
    };
    window.addEventListener('resize', this.update);
  }
  componentDidMount() {
    this.update();
  }
  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };
  render() {
    return (
      <div className="App">
        {/* <Suspense fallback={<div>loading</div>}> */}
        <Slideshow navbar={<NavBar />} />
        <TrendingMenu className="trendingMenu" />
      </div>
    );
  }
}

export default App;
// const Slideshow = React.lazy(() =>
//   import('./components/Slideshow/Slideshow.js')
// );
