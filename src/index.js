import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './Components/App.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter basename="/jyu_website">
    <App />
  </BrowserRouter>,
    document.getElementById('root')
  );
registerServiceWorker();
