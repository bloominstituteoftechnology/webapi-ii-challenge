import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react'
import axios from 'axios';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Segment>
          <h1>Post List</h1>
          {
            this.state.posts.map((post, id) => (
              <Segment key={id}>
                <Header as="h3">{post.title}</Header>
                <p>{post.contents}</p>
              </Segment>
            ))
          }
        </Segment>
      </div>
    );
  }
}

export default App;
