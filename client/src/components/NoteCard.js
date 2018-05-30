import React, { Component } from 'react';
import axios from 'axios';

class NoteCard extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            post: props.post,
            updating: false,
            title: props.post.title,
            contents: props.post.contents,
            deleted: false
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = () => {
        const newPost = {
            title: this.state.title, 
            contents: this.state.contents
        }
        axios.put(`http://localhost:5555/api/posts/${this.state.post.id}`, newPost)
            .then( res => {
                console.log(res);
            })
    }

    deletePost = () => {
        axios.delete(`http://localhost:5555/api/posts/${this.state.post.id}`)
            .then(
                this.setState({deleted: true})
            )
    }

    render() {
        return (
            this.state.deleted ? (
                null
            ) : (
                this.state.updating ? (
                    <div className="postCard">
                        <form onSubmit={this.handleSubmit}>
                            <input 
                                value={this.state.title}
                                name="title"
                                onChange={this.handleChange}
                                />
                            <input 
                                value={this.state.contents}
                                name="contents"
                                onChange={this.handleChange}
                                />
                            <div className="buttons">
                                <button className="btn">
                                    Submit
                                </button>
                                <button 
                                    className="btn danger"
                                    onClick={() => {this.setState({updating: false})}}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="postCard">
                        <h2 className="postTitle">{`"${this.state.post.title}"`}</h2>
                            <p>{`- ${this.state.post.contents}`}</p>
                        <div className="buttons">
                            <button 
                                className="btn"
                                onClick={() => this.setState({updating: true})}>
                                Update
                            </button>
                            <button 
                                className="btn danger"
                                onClick={this.deletePost}>
                                Delete
                            </button>
                        </div>
                    </div>
                )
            )
        )
    }
}
 
export default NoteCard;