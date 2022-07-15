import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../contexts/global/GlobalContext.jsx';

function Navbar() {
  const { foobar } = useGlobalContext();
  return (
    <div className="box">
      <nav className="justify-between">
        <h1 className="text">🔄 Demo App - {foobar}</h1>
        <div>
          <ul className="text">
            <li>
              <Link to="/" className="text">
                Home
              </Link>
            </li>
            <li>
              <Link to="/boxing" className="text">
                Boxing Game
              </Link>
            </li>
            <li>
              <Link to="/docs" className="text">
                Docs
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
