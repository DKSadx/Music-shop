import React, { Component, lazy, Suspense } from 'react';

import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Slideshow from './components/Slideshow/Slideshow';
import TrendingMenu from './components/TrendingMenu/TrendingMenu';
import PopularMenu from './components/PopularMenu/PopularMenu';
import Footer from './components/Footer/Footer';

// const Slideshow = React.lazy(() =>
//   import('./components/Slideshow/Slideshow.js')
// );
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Empty
    };
  }
  componentDidMount() {
    // Empty
  }
  render() {
    return (
      <div className="App">
        {/* <Suspense fallback={<div>loading</div>}> */}
        <Slideshow navbar={<NavBar />} />
        <TrendingMenu className="trendingMenu" />
        <PopularMenu className="popularMenu" />
        <Footer />
      </div>
    );
  }
}

export default App;
