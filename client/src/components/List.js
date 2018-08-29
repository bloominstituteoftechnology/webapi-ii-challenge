import React, { Component } from 'react';
import axios from 'axios';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [] 
        };
    }

    componentDidMount() {
        const endpoint = 'http://localhost:9000/api/posts';

        axios
        .get(endpoint)
        .then(response => {
            this.setState(() => ({ posts: response.data }));
        })
        .catch(error => {
            console.error('Server Error', error);
        });
    }

    render() {
        return (
            <div>
                {this.state.posts.map(post => {
                    return (
                        <div key={ post.id }>
                            <h3>title: { post.title }</h3>
                            <p>content: { post.contents }</p> 
                        </div>       
                    )
                })}
            </div>
        )    
    }
}

export default List;