import React, { Component } from 'react';
import axios from 'axios';


export default class NewPost extends Component {
    state = {
        posts: [],
        newTitle: '',
        newContents: ''
    };

    


    // componentDidMount() {
    //     axios
    //         .get('http://localhost:5000/api/posts')
    //         .then(response => {
    //             this.setState(() => ({posts: response.data}));
    //         })
    // }

    addPost = (event) => {
        console.log(this.state)
        // event.preventDefault();
        const posts = this.state.posts;
        axios
        .post('http://localhost:5000/api/posts', {title: this.state.newTitle, contents: this.state.newContents})
        .then(response => {{posts.push({title: this.state.newTitle, contents: this.state.newContents})
        console.log('Sub', response)
        this.setState({
                title: '',
                contents: '',
                posts: posts
        })
        axios.get('http://localhost:5000/api/posts')
        .then(response => {
            this.setState({ posts: response.data })
        })
        }}
    )}

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

render() {
    return (
        <form className="new-form">
            <input name='newTitle' className='post-input post-input-title' type='text' onChange={(event) => this.handleChange(event)} placeholder='-Put A [B]ost Title Here-' value={this.state.newTitle} />
            <textarea name='newContents' className='post-input post-input-text' type='text' onChange={(event) => this.handleChange(event)} placeholder='-Whats On Your [B]ind?-' value={this.state.newContents} />
            <button className='post-button' onClick={(event) => this.addPost(event)}>Submit</button>
        </form>
    )
}
    
}



