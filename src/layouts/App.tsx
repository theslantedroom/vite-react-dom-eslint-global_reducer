import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import { Home } from '../pages/Home';
import { StreetLightXstate } from '../pages/StreetLightXstate';
import { FightPage } from '../pages/FightPage';
import { BoxingLog } from '../pages/BoxingLog';
import { EndlessScroll } from '../pages/EndlessScroll';
import { SwipeablePage } from '../pages/SwipeablePage';

export const appRoutes = [
  { path: '/', element: <Home />, navText: 'Home' },
  { path: '/EndlessScroll', element: <EndlessScroll />, navText: 'EndlessScroll' },
  { path: '/SwipeablePage', element: <SwipeablePage />, navText: 'SwipeablePage' },
  { path: '/StreetLightXstate', element: <StreetLightXstate />, navText: 'StreetLightXstate' },
  { path: '/FightPage', element: <FightPage />, navText: 'FightPage' },
  { path: '/BoxingLog', element: <BoxingLog />, navText: 'BoxingLog' },
];

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {appRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
