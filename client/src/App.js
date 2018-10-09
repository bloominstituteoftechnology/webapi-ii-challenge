import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import Posts from './Components/Posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      contents: ''
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then(response => this.setState({ posts: response.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <nav>
          <div>
            <NavLink exact to='/'>Posts</NavLink>
          </div>
        </nav>
        <Route
          exact
          path='/'
          render={props => <Posts {...props} posts={this.state.posts} />}
        />
      </div>
    );
  }
}

export default App;
