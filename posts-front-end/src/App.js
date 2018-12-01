import React, { Component } from 'react';
import Posts from './components/Posts.js';
import SinglePost from './components/SinglePost.js';
import Form from './components/Form.js';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
    constructor(props)  {
        super(props);
        this.state  =   {
            posts: [],
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts    =   ()  =>  {
        axios
            .get("http://localhost:4000/api/posts/")
            .then(({data}) =>    {
                this.setState((state)   =>  ({
                    posts: data,
                }))
            })
            .catch((err)    =>  {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" render={(props) =>  <Form posts={this.state.posts} getPosts={this.getPosts} {...props}/>} />
                <Route exact path="/" render={(props)   =>  <Posts posts={this.state.posts} getPosts={this.getPosts} {...props}/>} />
                <Route exact path="/posts" render={(props)   =>  <Posts posts={this.state.posts} getPosts={this.getPosts} {...props}/>} />
                <Route exact path="/posts" render={(props) =>  <Form posts={this.state.posts} getPosts={this.getPosts} {...props}/>} />
                <Route path="/post/:id" render={(props) =>  <Form posts={this.state.posts} getPosts={this.getPosts} {...props}/>} />
                <Route path="/post/:id" render={(props) =>  <SinglePost posts={this.state.posts} getPosts={this.getPosts} {...props}/>} />
            </div>
        );
    }
}

export default withRouter(App);
