import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class SinglePost extends Component  {
    constructor(props)  {
        super(props);
        this.state  =   {
            title: "",
            contents: "",
        }
    }

    componentWillReceiveProps(newProps)  {
        const relPost = newProps.posts.filter((post) =>  {
            console.log(post.id, parseInt(this.props.match.params.id));
            return post.id === parseInt(this.props.match.params.id);
        })[0]
        if(relPost) {
            this.setState((state)   =>  ({
                title: relPost.title,
                contents: relPost.contents,
            }))
        }
    }

    componentDidMount() {
        this.props.getPosts()
    }

    onDeleteHandler =   ({target})  =>  {
        axios
        .delete(`http://localhost:4000/api/posts/${this.props.match.params.id}`)
        .then((data)    =>  {
            this.props.getPosts()
        })
        .then((data)    =>  {
            return this.props.history.push("/")
        })
    }

    render()    {
        return(
            <div>
                <div>
                    Title:  {this.state.title}
                </div>
                <div>
                    Contents:  {this.state.contents}
                </div>
                <div onClick={this.onDeleteHandler}>
                    X
                </div>
            </div>
        )
    }
}

export default withRouter(SinglePost);
