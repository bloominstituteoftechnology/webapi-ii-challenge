import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Post extends Component    {
    onDeleteHandler =   ({target})  =>  {
        axios
        .delete(`http://localhost:4000/api/posts/${this.props.id}`)
        .then((data)    =>  {
            this.props.getPosts()
        })
    }

    navigateToPostHandler = ({target})  =>  {
        return this.props.history.push(`/post/${this.props.id}`)
    }

    render()    {
        console.log(this.props)
        return(
            <div>
                <div onClick={this.navigateToPostHandler}>
                    {this.props.title}
                </div>
                <div onClick={this.navigateToPostHandler}>
                    {this.props.contents}
                </div>
                <div onClick={this.onDeleteHandler}>
                    X
                </div>
            </div>
        )
    }
}

export default withRouter(Post);
