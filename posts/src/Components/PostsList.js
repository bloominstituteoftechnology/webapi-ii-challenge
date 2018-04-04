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

        this.getPosts();
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
                       <Card onMouseUp={(e) => this.deletePost(e)} id={post.id} key={i}>
                           <Text>{post.title}</Text>
                           <Text>{post.contents}</Text>
                        </Card>
                    )
                })}
                {console.log(this.state.posts)}
            </Fragment>
        )
    }

}

export default PostsList;
