import React, { Component } from 'react'
import './styles/App.css'
import Posts from './components/Posts'
import Post from './components/Post'
import axios from 'axios'
import { Route } from 'react-router-dom'

class App extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/api/posts')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(e => {
                console.log(e, 'ERROR')
            })
    }

    render() {
        
        return (
            <div>
                <Route exact path="/" render={props => <Posts {...props} posts={this.state.posts} />} />
                <Route exact path="/:id" component={Post} />
            </div>
        )
    }
}

export default App
