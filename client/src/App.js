import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


class App extends Component {
  constructor() {
    super()
      this.state = {
        posts: [],
      }
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then((res) => this.setState({posts: res.data}))
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className="App">
      should see posts
      {this.state.posts.map(item => (
            <div key={item.id}>
              <h4>{item.title}</h4>
              <p>{item.contents}</p>
            </div>
            ))}


      </div>
    );
  }
}

export default App;
