import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.scss';
import { baseName } from './utils/consts';

const app = (
  <BrowserRouter basename={baseName}>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
