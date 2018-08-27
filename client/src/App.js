import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [{ title: 'Loading', contents: 'Just wait!' }]
    };
  }

  URL = 'http://localhost:3333/posts';

  /* Axios requests */

  getPosts = () => {
    axios.get(`${this.URL}`)
      .then(({ data }) => this.setState({ posts: data }))
      .catch(err => console.error(err));
  };

  getPost = id => {
    axios.get(`${this.URL}/${id}`)
      .then(({ data }) => this.setState({ posts: data }))
      .catch(err => console.error(err));
  };

  /* Lifecycle methods */

  componentDidMount() {
    this.getPosts();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node Express Posts</h1>
        </header>
        <div>
          {this.state.posts.map(post => {
            const { title, contents, id } = post;
            return (
              <div onClick={() => this.getPost(id)} className="post" key={id}>
                <h4 className="post-title">{title}</h4>
                <p>{contents}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
