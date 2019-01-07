import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import PostsList from './components/PostsList';
import IndividualPost from './components/IndividualPost';

class App extends Component { 
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={PostsList} />
        <Route 
          exact path='/posts/:postId' 
          render={(props) => <IndividualPost {...props} />}
        />
      </div>
    );
  }
}

export default App;
