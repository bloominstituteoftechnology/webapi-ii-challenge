import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ListView, PostView, AddView } from './views';
import { Header } from './components'

import './App.css';

class App extends Component {
  render() {

    return (
    <div className='wrapper'>
      <Route path='/' component={Header} />
      <Route exact path='/' component={ListView} />
      <Switch>
        <Route path='/add' render={props => <AddView {...props}/>} />
        <Route path='/:id' render={props => <PostView {...props}/>} />
      </Switch>
    </div>
    );
  }
}

export default App;
