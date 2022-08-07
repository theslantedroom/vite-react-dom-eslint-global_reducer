import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { StreetLightXstate } from '../pages/StreetLightXstate';
import { FightPage } from '../pages/FightPage';
import { EndlessScroll } from '../pages/EndlessScroll';
import { SwipeablePage } from '../pages/SwipeablePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/EndlessScroll" element={<EndlessScroll />} />
        <Route path="/SwipeablePage" element={<SwipeablePage />} />
        <Route path="/StreetLightXstate" element={<StreetLightXstate />} />
        <Route path="/FightPage" element={<FightPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
