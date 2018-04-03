import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ListView from './components/ListView';
import PostView from './components/PostView';
import LeftRail from './components/LeftRail';
import CreatePost from './components/CreatePost';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={LeftRail} />
          <Route exact path="/posts" component={ListView} />
          <Route exact path="/postview/:id" component={PostView} />
          <Route exact path="/createpost" component={CreatePost} />
        </div>
      </Router>
    );
  }
}

export default App;
