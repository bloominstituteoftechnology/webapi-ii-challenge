import React, { Component } from 'react';
import Posts from './components/Posts.js';
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
                <Posts posts={this.state.posts} getPosts={this.getPosts} />
            </div>
        );
    }
}

export default App;
