import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import '../static/css/index.css';
import App from './App.jsx';
import { GlobalContextProvider } from '../../src/contexts/global/GlobalContext.jsx';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>
);
