import React, { lazy, Suspense } from 'react';

import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Slideshow from './components/Slideshow/Slideshow';
import TrendingMenu from './components/TrendingMenu/TrendingMenu';
import PopularMenu from './components/PopularMenu/PopularMenu';
import Footer from './components/Footer/Footer';

// !!! Lazy needs to be implemented

// const Slideshow = React.lazy(() =>
//   import('./components/Slideshow/Slideshow.js')
// );
const App = () => {
  return (
    <div className="App">
      <Slideshow navbar={<NavBar />} />
      <TrendingMenu className="trendingMenu" />
      <PopularMenu className="popularMenu" />
      <Footer />
    </div>
  );
};

export default App;
