import React, { Component } from 'react';
import ListPosts from "./components/listPosts"
import Post from "./components/post"
import Posts from "./components/posts"
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
    .then(res => {

      
      console.log(res.data)
      this.setState(() => ({ posts: res.data }));
      console.log(this.state.posts)
    })
    .catch(error => {
      console.error('Server Error', error);
    }); 
  }

 
   render() {
    return (
      <div className="App">{this.state.posts}
         
       {/*   <Route exact path="/" render={props => (<Posts posts={this.state.posts} /> )} /> */}
         <Route exact path="/" component={ListPosts}   /*  render={props => (<Posts posts={this.state.posts} /> )} */ />
        <Route path="/ListPosts" component={ListPosts} />
      {/*   <Route path="/Posts/:id" component={Post} /> */}
        
      
      </div>
    );
  }
}

export default App;
