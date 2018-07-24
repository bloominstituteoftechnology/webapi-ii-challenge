import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      title: '',
      contents: ''
    }
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get('http://localhost:5000/posts')
      .then((response) => {
        console.log('response', response);
        //this.setState({posts: response.data.posts})
      })
      .catch(err => console.log(err));
  }

  handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/posts/${id}`)
      .then((response) => {  
        this.getData()
      })
      .catch(err => console.log(err));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    axios
      .post(`http://localhost:5000/posts`, {
        title: this.state.title,
        contents: this.state.contents
      })
      .then(response => {
        console.log('submit data', response.data)
        this.getData()
      })
      .catch(err => console.log(err));
  }

  render() {
    //console.log('state', this.state.posts)
    return (
      <div className="App">
        <h1>Node Express Lab</h1>
        {/* <input 
          name="title" 
          type="text" 
          placeholder="title" 
          onChange={(e) => this.handleChange(e)} /><br />
        <textarea 
          name="contents"  
          placeholder="content" 
          onChange={(e) => this.handleChange(e)} /><br />

        <button onClick={() => this.handleSubmit()}>Submit</button>

        {this.state.posts.map(post => {
          return ( 
            <div key={post.id}>
              <div>
                Title: {post.title}
              </div>
              <div>
                Content: {post.content}
              </div>
              <button onClick={() => this.handleDelete(post.id)}>Delete</button>
            </div>
          )
        })} */}
      </div>
    );
  }
}

export default App;
