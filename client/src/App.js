import React, { Component, lazy, Suspense } from 'react';
import { Controller, Scene } from 'react-scrollmagic';

import NavBar from './components/NavBar/NavBar';
import './App.scss';
// const Slideshow = React.lazy(() =>
//   import('./components/Slideshow/Slideshow.js')
// );
import Slideshow from './components/Slideshow/Slideshow';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        {/* <Suspense fallback={<div>loading</div>}> */}
        <Slideshow navbar={<NavBar />} />
        {/* </Suspense> */}
        {/* <Controller>
          <Scene
            duration={1500}
            offset={-500}
            triggerElement="#test1"
            reverse={true}
            indicators={{
              colorStart: '#fff',
              colorEnd: 'blue'
            }}
          >
            <Tween
              from={{
                x: -500,
                y: 200,
                visibility: 'hidden',
                opacity: 0,
                color: 'red',

                'font-size': 0
              }}
              to={{
                x: 0,
                y: 200,
                visibility: 'visible',
                opacity: 1,
                color: 'green',
                'font-size': 30
              }}
              stagger={1}
            >
           </Tween>
          </Scene>
        </Controller> */}
      </div>
    );
  }
}

export default App;
