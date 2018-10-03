import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {fetchPosts} from './actions/index';
import PostsList from './components/PostsList';
import PostForm from './components/PostForm';
import PostDetails from './components/PostDetails';
import PostEdit from './components/PostEdit';
import {Switch, Route, Link, withRouter} from 'react-router-dom';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      search: ''
    }
  }
  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path = '/' render={(props) => {
          
          return (
            <div>
            <PostForm />
            <PostsList />
            </div>
          )
        }
        
        } />

        <Route exact path = '/posts/:id' render = {(props) =>
           <PostDetails/>
        
        } />

        <Route exact path = '/posts/edit/:id' render = {(props) => 

           <PostEdit  />
        } />

        </Switch>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchPosts
})(App));
