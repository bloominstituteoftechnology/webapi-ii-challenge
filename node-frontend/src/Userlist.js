import React, { Component } from "react";
import axios from "axios";

class UserList extends Component {
  state = {
    posts: [],
    titleInput: "",
    contentsInput: "",
    idInput: ''
  };
  handleInput = event => {
      const {name, value} = event.target
      this.setState({
          [name]: value
      })
  }
  postInput = () => {
    if(!this.state.idInput){
      axios.post("http://localhost:8000/api/posts", {
          title: this.state.titleInput,
          contents: this.state.contentsInput
      }).then(res => {          
        axios.get(`http://localhost:8000/api/posts/`).then(
            res => {
            this.setState({
            posts:res.data
        })}
        )
        
    })
    }else {
      this.updatePost(parseInt(this.state.idInput))
    }
      
  }

  deletePost = id => {
      axios.delete(`http://localhost:8000/api/posts/${id}`)
      .then(res => {          
          axios.get(`http://localhost:8000/api/posts/`).then(
              res => {
              this.setState({
              posts:res.data
          })}
          )
          
      })
  }

  updatePost = id => {
    console.log('hi');
    console.log(id);
    axios.put(`http://localhost:8000/api/posts/${id}`, {
      title: this.state.titleInput,
      contents: this.state.contentsInput
    }).then(() => {
      axios.get('http://localhost:8000/api/posts/').then(
        res => {
          this.setState({
            posts:res.data
          })
        }
      )
    })
  }

  render() {
    const { posts, titleInput, contentsInput, idInput } = this.state;
    return (
      <div>
        <input onChange={this.handleInput} name = "titleInput" value={titleInput} />
        <input onChange={this.handleInput} name = "contentsInput" value={contentsInput} />
        <input onChange={this.handleInput} name = "idInput" value={idInput} />
        <button type='butto' onClick={this.postInput}>Sumbit</button>
        <h1>Post List</h1>
        <ul>
          {posts.length > 1 ? posts.map(post => {
            return (
              <div>
                <h2>{post.title}, {post.id}</h2>
                <p>{post.contents}</p>
                <button type='button' onClick={() => this.deletePost(post.id)}>Delete</button>
              </div>
            );
          }): <h2>Loading</h2>}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    axios.get("http://localhost:8000/api/posts").then(res => {
      console.log(res);
      this.setState({
        posts: res.data
      });
    });
  }
}

export default UserList