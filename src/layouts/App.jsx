import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Boxing from '../pages/Boxing.jsx';
import '../classes/typescript.ts';

function App() {
  return (
    <BrowserRouter>
      <div className="pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Boxing" element={<Boxing />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
