import React, {Component} from 'react';
import './App.css';
import Posts from './components/Posts';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    const server = 'http://localhost:5000';
    axios
      .get(`${server}/api/posts`)
      .then(res => {
        console.log(res);
        this.setState({posts: res.data});
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>Client App</h1>
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
