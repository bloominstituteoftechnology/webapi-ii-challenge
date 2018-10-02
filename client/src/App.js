import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import './App.css';
import PostsView from './views/PostsView';
// import HomeView from './views/HomeView';
import PostView from './views/PostView';
import EditView from './views/EditView';
import CreatePostView from './views/CreatePostView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navigation-panel">
            <h1>Lambda Posts</h1>
            <button onClick={() => this.props.history.push("/")}
                    className="posts-button">
                    View Your Posts</button>
            <button onClick={() => this.props.history.push("/create-post")}  
                    className="create-post-button">
                    + Create New Post</button>
        </nav>
        <div className="display-panel">
          {/* <Route  path="/"
                  component={HomeView} /> */}
          <Route  exact
                  path='/'
                  component={PostsView} />
          <Route  path='/post/:id'
                  component={PostView} />
          <Route  path='/create-note'
                    component={CreatePostView}/>
          <Route  path='/edit/:id'
                    component={EditView}/>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
