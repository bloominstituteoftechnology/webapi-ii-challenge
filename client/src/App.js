import React, { Component } from 'react';
import ListPosts from "./components/listPosts"
import Post from "./components/post"
import { Route } from 'react-router-dom';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
    .get('http://localhost:4000/api/posts')
    .then(response => {
      this.setState(() => ({ posts: response.data }));
    })
    .catch(error => {
      console.error('Server Error', error);
    }); 
  }

  
   render() {
    return (
      <div className="App">
         <Route exact path="/" component={ListPosts}   /*  render={props => (<Posts posts={this.state.posts} /> )} */ />
        <Route path="/ListPosts" component={ListPosts} />
      {/*   <Route path="/Posts/:id" component={Post} /> */}
        
      
      </div>
    );
  }
}

export default App;
