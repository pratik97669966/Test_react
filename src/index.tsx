import React from 'react';
import ReactDOM from 'react-dom';

import WebQUpAppBiz from './pages/app/WebQUpAppBiz';
import reportWebVitals from './reportWebVitals';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <WebQUpAppBiz />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
