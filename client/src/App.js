import React, { useState, useEffect } from "react";

import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  useEffect(()=> {

  }, [posts])
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
};

export default App;
