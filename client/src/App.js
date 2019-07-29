import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import HomePage from './components/HomePage/HomePage';
import Store from './components/Store/Store';
import Edit from './components/Edit-testing/Edit';
// !!! Lazy needs to be implemented

// const Slideshow = React.lazy(() =>
//   import('./components/Slideshow/Slideshow.js')
// );
const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/store" component={Store} />
        <Route path="/edit" component={Edit} />
        {/* <Route path="/about" component={About} /> */}
      </Switch>
      {/* <HomePage /> */}
    </div>
  );
};

export default App;
