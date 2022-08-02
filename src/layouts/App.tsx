import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
