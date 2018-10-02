import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Post from './components/onePost.js';
import Posts from './components/myPosts.js';

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from "react-router-dom";

class App extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    posts: []
	};
    }

    componentDidMount() {
	axios
	    .get('http://localhost:8001/api/posts/')
	    .then(response => {
		const posts = response.data;
		this.setState({posts});
	    })
	    .catch(err => console.log(err));
    }
    
    render() {
	return (
	    <div className="App">
	      <Route exact path='/' render={ (props) => <Posts {...props} posts={this.state.posts} /> } />
	      <Route exact path='/:id' component={Post} />
	    </div>
	);
    }
}

export default App;
