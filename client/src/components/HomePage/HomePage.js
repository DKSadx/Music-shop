import React from 'react';

import NavBar from '../NavBar/NavBar';
import Slideshow from '../Slideshow/Slideshow';
import TrendingMenu from '../TrendingMenu/TrendingMenu';
import PopularMenu from '../PopularMenu/PopularMenu';
import Footer from '../Footer/Footer';

export default function HomePage() {
  return (
    <>
      <Slideshow navbar={<NavBar />} />
      <TrendingMenu className="trendingMenu" />
      <PopularMenu className="popularMenu" />
      <Footer />
    </>
  );
}
