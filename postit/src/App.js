import React, { Component } from 'react';
import './App.css';
import Posts from './components/Posts'
import Route from 'react-router-dom/Route';
import AddPost from './components/AddPost';
import UpdatePost from './components/UpdatePost';
// import {Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Posts}/>
        <Route path="/add" component={AddPost} />
        <Route path="/update/:id" component={UpdatePost} />
      </div>
    );
  }
}

export default App;
