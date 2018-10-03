import React from 'react';
import {connect} from 'react-redux';
import {addPost, fetchPosts} from '../actions/index';
import {withRouter} from 'react-router-dom';

class PostForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            contents: '',
        }
    }

    handleInput = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let newPost = {
            title: this.state.title,
            contents: this.state.contents
        };

        this.props.addPost(newPost);

        this.setState({
            title: '',
            contents: ''
        })
        
        setTimeout(() => {
            this.props.fetchPosts();
        }, 100);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleInput} name = 'title' type = 'text' placeholder='title' value={this.state.title} ></input>
                    <input onChange={this.handleInput} name='contents' type = 'text' placeholder='contents' value={this.state.contents}></input>
                    <button type = 'submit'>Submit Post</button>
                </form>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posting: state.posting,
        posted: state.posted,
    }
}

export default withRouter(connect(mapStateToProps, {
    addPost,
    fetchPosts
})(PostForm));