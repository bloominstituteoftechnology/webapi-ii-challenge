import React from 'react'
import axios from 'axios'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = { post: {}}
    }
    componentDidMount() {
        axios
            .get(`http://localhost:8000/api/posts/${this.props.id}`)
            .then(res => {
                this.setState({
                  post: res
                })
            })
            .catch(e => {
                console.log(e, 'error')
            })
    }
    render() {
        return (
            <div>
                <h2>Title: {this.props.title}</h2>
                <p>Contents: {this.props.contents}</p>
            </div>
        )
    }
}

export default Post
