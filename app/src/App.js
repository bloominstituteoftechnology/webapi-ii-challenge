import React, { Component } from 'react';
import banner from './images/banner.png';
import './App.css';
import {connect} from 'react-redux';
import action from './actions';
import PostList from './components/PostLists';

class App extends Component {
  componentDidMount(){
    this.props.action();
  }
  
  render() {
    return (
      <div className="App">
        <div className='App-header'>
          <img src={banner} className="banner" alt="logo" />
        </div>
        <PostList posts={this.props.posts} />
      </div>
    );
  }
}

const mapDispatchtoProps = state =>({
  getting: state.getting,
  gotmine: state.gotmine,
  posts: state.posts
})

export default connect(mapDispatchtoProps, {action})(App);
