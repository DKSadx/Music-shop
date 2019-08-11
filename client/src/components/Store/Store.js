import React from 'react';
import './Store.scss';

import StoreCover from '../StoreCover/StoreCover';
import StoreProducts from '../StoreProducts/StoreProducts';
import Footer from '../Footer/Footer';

export default function Store() {
  document.title = 'Store';
  return (
    <div className="store">
      <StoreCover />
      <StoreProducts />
      <Footer />
    </div>
  );
}
