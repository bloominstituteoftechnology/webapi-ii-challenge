import React from 'react';
import axios from 'axios';
import Post from './Post';

class PostsList extends React.Component {
    constructor() {
        super();
        this.state = {
          posts: [],
        }
      }

    componentDidMount() {
        axios.get('http://localhost:5000/api/posts/')
          .then(response => {
            console.log(response.data);
            this.setState({ posts: response.data });
          })
          .catch(error => {
            console.log(error);
          })
      }

    render() {
        return(
            <div>
                {this.state.posts.map(post => (
                    <Post 
                        key={post.id} 
                        data={post}
                    />
                ))}
            </div>
        );
        }
}

export default PostsList;