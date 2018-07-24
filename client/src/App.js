import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

constructor() {
    super();
    this.state = {
      posts: [],
    };
  }
	
componentDidMount() {
	this.loadPosts();  
}


/*componentDidUpdate(prevProps,  prevState) {
if (prevState.posts !== this.state.posts){
        this.loadPosts();
        //this.setState({createNote: true});
}
}*/


loadPosts = () => {
	axios
      .get("http://localhost:9000/api/posts")
      .then(response => {
        console.log("GET RESPONSE: ", response);
        this.setState({ posts: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };


deleteHandler = id => {
	axios
	.delete(`http://localhost:9000/api/posts/${id}`)
	.then(response => {
        console.log("GET RESPONSE: ", response);
      	this.loadPosts();  
      })

      .catch(err => {
        console.log(err);
      });
};



	
render() {
    return (
      <div className="main-container">
	<h1 className="header-style">Posts</h1>	
	<div className="App">
	{this.state.posts.map(post => 
       <div className="post-container" key={post.id}>
	<p className="post-title">{post.title}</p>
	<p className="post-content">{post.contents}</p>
	<button onClick={()=>{this.deleteHandler(post.id)}}>delete</button>
	</div>
      )}
    	</div>
	</div>
    );
  }
}

export default App;
