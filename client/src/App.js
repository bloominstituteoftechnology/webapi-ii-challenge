import React from 'react';
import ListView from './components/ListView'
import {Route} from 'react-router-dom'
//import styled from 'styled-components'


const App = () => {
    return (
      <div >
        <h1>Quotes</h1>
        <Route exact path='/' component={ListView}></Route>
      </div>
    );
  }


export default App;
