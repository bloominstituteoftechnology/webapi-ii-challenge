import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <div className="App">
        <h1>Node-Express-Lab</h1>
        <div>
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
