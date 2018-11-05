import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.getPosts();
  }


  getPosts = () => {
    axios
      .get('http://127.0.0.1:9000/api/posts')
      .then(res => {
        this.setState({
          posts: res.data

        })
      })
      .catch(err => {
        console.log(err)
        return err
      })
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.length < 1 ? (
            <div>loading</div>
          ) : (
            this.state.posts.map( post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
      </div>
    );
  }
}

const PostCard = props => {
  const { title, contents } = props.post; 
  return (
    <div className="post-card">
      <h2>{title}</h2>
      <p>{contents}</p>
    </div>
    )
}

export default App;
