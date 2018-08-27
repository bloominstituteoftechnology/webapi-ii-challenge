import React, {Component} from 'react';
import axios from 'axios';
import Post from "./Post";
const url = 'http://localhost:5000/api/posts/';


class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            posts: []
         }
    }

    componentDidMount() {
        axios.get(url)
          .then(res => {
            this.setState({
              posts: res.data
            })
          })
          .catch(error => {
            console.log('Could not get the posts!', error);
          })
      }

    render() { 
        return ( 
            <div>
            {this.state.posts.map(post => {
                return (
                <Post 
                    key={post.id}
                    title={post.title}
                    contents={post.contents}
                    created={post.created_at}
                    updated={post.updated_at}
                />
            )})}
            </div>
         );
         
    }
}
 
export default PostsList;