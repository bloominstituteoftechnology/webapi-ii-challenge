import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Post from "./Post";
const url = 'http://localhost:5000/api/posts/';


const ListWrap = styled.div`
    > h1 {
        color: #72593d;
    }
`

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
            <ListWrap>
            <h1>Lord Of The Rings Quotes</h1>
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
            </ListWrap>
         );
         
    }
}
 
export default PostsList;