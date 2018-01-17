import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
      <nav>
        <ul>
          <li><Link to='/volume'>3D Volume Model</Link></li>
          <li><Link to='/polygon'>n-Polygon Model</Link></li>
        </ul>
      </nav>
    </header>
  )

  export default Header;