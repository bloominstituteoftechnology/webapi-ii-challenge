import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Card from './Card';
import styled from 'styled-components';

class PostsList extends Component {
    state = {
        posts: [],
    };


    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        axios.get('http://localhost:5000/api/posts')
        .then(response => this.setState({ posts: response.data}))
        .catch(error => console.error('Server Error: ', error))

    }

    deletePost(event) {

        const { id } = event.target;
        axios.delete(`http://localhost:5000/api/posts/${id}`)
        .then((response) => console.log(response.data))
        .catch(error => console.error('Server Error:', error))

        // this.getPosts();
    }


    render() {
        const Text = styled.p`

            margin: 30px;
            font-weight: 900;
            font-size: 1.7rem;
        `
        return (
            <Fragment>
                {this.state.posts.map((post, i) => {
                    return (
                       <Card onMouseDown={(e) => this.deletePost(e)} onMouseUp={() => this.getPosts()} id={post.id} key={i}>
                           <Text id={post.id}>{post.title}</Text>
                           <Text id={post.id}>{post.contents}</Text>
                        </Card>
                    )
                })}
            </Fragment>
        )
    }

}

export default PostsList;
