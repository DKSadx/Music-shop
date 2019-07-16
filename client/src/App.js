import React from 'react';

import NavBar from './components/NavBar/NavBar';
import Slideshow from './components/Slideshow/Slideshow';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Slideshow>
        <NavBar />
      </Slideshow>
    </div>
  );
};

export default App;
