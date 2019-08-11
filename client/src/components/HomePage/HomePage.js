import React from 'react';

import NavBar from '../NavBar/NavBar';
import Slideshow from '../Slideshow/Slideshow';
import TrendingMenu from '../TrendingMenu/TrendingMenu';
import PopularMenu from '../PopularMenu/PopularMenu';
import Footer from '../Footer/Footer';

export default function HomePage() {
  document.title = 'Home';
  return (
    <>
      <Slideshow navbar={<NavBar />} />
      <TrendingMenu className="trending-menu" />
      <PopularMenu className="popular-menu" />
      <Footer />
    </>
  );
}
