import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ListView, PostView, AddView } from './views';
import { Header } from './components'

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      newPost: [],
    }
  }

  saveHelper = post => {
    this.setState({
      newPost: post,
    })

  }
  render() {

    return (
    <div className='wrapper'>
      <Route path='/' component={Header} />
      <Route exact path='/' render={props => <ListView {...props} newPost={this.state.newPost} />} />
      <Switch>
        <Route path='/add' render={props => <AddView {...props} saveHelper={this.saveHelper}/>} />
        <Route path='/:id' render={props => <PostView {...props}/>} />
      </Switch>
    </div>
    );
  }
}

export default App;
