import React from 'react';
import queryString from 'query-string';
import './Store.scss';

import StoreCover from '../StoreCover/StoreCover';
import StoreProducts from '../StoreProducts/StoreProducts';
import Footer from '../Footer/Footer';

export default function Store(props) {
  document.title = 'Store';
  return (
    <div className="store">
      <StoreCover />
      <StoreProducts query={queryString.parse(props.location.search)} />
      <Footer />
    </div>
  );
}
