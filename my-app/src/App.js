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
      this.fetchData()
    })
    .catch(err => {
      console.log("Error while deleting")
    })
  }


  addPost = event => {
    event.preventDefault();
    const newPost = {
      title: this.state.title,
      contents: this.state.contents
    }

    axios.post(("http://localhost:5000/api/posts"), newPost)
      .then(postSend => {
        this.fetchData();
      })
      .catch(err => {
        console.log("Error sending post")
      })

      this.setState({
        title: '',
        contents: ''
      })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };



  render() {
    return (
      <div>
      {this.state.mounted === false ? (
        <div>Fetching....</div>
      ) : (
        <div>
          <div className="banner">
            Lambda Posts
          </div>
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
        </div>
      )}
      <div className="form">
        <form onSubmit={this.addPost}>
              <input onChange={this.handleInputChange} name="title" placeholder="Title" type="text"/>
              <input onChange={this.handleInputChange} name="contents" placeholder="Content" type="text"/>
              <button type="submit">Submit</button>
          </form>
      </div>
      </div>
    );
  }
}

export default App;
