import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import HomePage from './components/HomePage/HomePage';
import Store from './components/Store/Store';
import About from './components/About/About';
import Edit from './components/Edit-testing/Edit';
import Account from './components/Account/Account';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/store" component={Store} />
        <Route path="/edit" component={Edit} />
        <Route path="/about" component={About} />
        <Route path="/account" component={Account} />
      </Switch>
    </div>
  );
};

export default App;
