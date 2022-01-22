import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="pt-20">
        <Navbar />
        <Routes>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
