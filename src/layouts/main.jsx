import React from 'react';
import ReactDOM from 'react-dom';
import '../static/css/index.css';
import App from './App.jsx';
import { GlobalContextProvider } from '../../src/contexts/global/GlobalContext.jsx';

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
