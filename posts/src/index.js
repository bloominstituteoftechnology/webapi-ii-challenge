import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom'


import App from './App';

import { injectGlobal } from 'styled-components';


injectGlobal`

html,body { 
    box-sizing: border-box;
    overflow: hidden;
    margin: 0;
    padding: 0;
    font-family: arial;
    font-size: 62.5%;
}

`

ReactDOM.render(

  <Router>  
    <Route to={"/"} component = {App} />
  </Router>    

, document.getElementById('root'));

