import React from 'react';
import axios from 'axios'
import {Route, NavLink} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'reactstrap'

import './App.css';

import Posts from './components/Posts'
import Post from './components/Post'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      comments: []
    }
  }

  getComments = post => {
    axios
      .get(`https://lotr-users.herokuapp.com/api/posts/${post.id}/comments`)
      .then(res => {
        this.setState({
          comments: res.data
        })
      })
      .catch(err => {
        console.log("Error: ", err)
      })
  }

  updatePosts = posts => {
    this.setState({
      posts
    })
  }
  
  componentDidMount() {
    axios.get("https://lotr-users.herokuapp.com/api/posts")
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
      .catch(err => {
        console.log("Error: ", err)
      })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>LOTR Blog</h1>
        </header>
        <Navbar>
          <Nav>
            <NavItem>
              <NavLink to = "/posts">Posts</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Route exact path = "/posts" render = {
          props => (
            <Posts 
              {...props}
              posts = {this.state.posts}
              updatePosts = {this.updatePosts}
            />
          )
        } />
        <Route
          path="/posts/:id"
          render={props => (
            <Post
              {...props}
              posts={this.state.posts}
              updatePosts={this.updatePosts}
              comments = {this.state.comments}
              getComments = {this.getComments}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
