import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import Home from './components/Pages/Home/Home';
import Store from './components/Pages/Store/Store';
import About from './components/Pages/About/About';
import Edit from './components/Pages/Edit-testing/Edit';
import Account from './components/Pages/Account/Account';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/store" component={Store} />
        <Route path="/edit" component={Edit} />
        <Route path="/about" component={About} />
        <Route path="/account" component={Account} />
      </Switch>
    </div>
  );
};

export default App;
