import React, { Component } from 'react'
import './styles/App.css'
import Posts from './components/Posts'
import axios from 'axios'

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
                <Posts posts={this.state.posts} />
            </div>
        )
    }
}

export default App
