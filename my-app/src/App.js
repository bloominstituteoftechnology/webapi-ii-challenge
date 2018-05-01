import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      mounted: false,
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    })
    this.fetchData();
   };


  fetchData = () => {
    axios.get("http://localhost:5000/api/posts")
    .then(response => {
      this.setState({
        posts: response.data
      })
      console.log(this.state.posts)
    })
    .catch(err => {
      console.log("There was an error fetching posts")
    })
  }

  delete = id => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
    .then(response => {
      alert(`Post ${id} was successfully deleted`)
    })
    .catch(err => {
      console.log("Error while deleting")
    })
  }



  render() {
    return (
      <div>
      {this.state.mounted === false ? (
        <div>Fetching....</div>
      ) : (
        <ul>
          {this.state.posts.map(post => {
            return(
              <li key={post.id} className="card">
                <h2>{post.title}</h2>
                <p>- {post.contents}</p>
                <button onClick={() => {
                  this.delete(post.id)
                }}>Delete</button>
              </li>
            )
          })}
        </ul>
      )}
      </div>
    );
  }
}

export default App;
