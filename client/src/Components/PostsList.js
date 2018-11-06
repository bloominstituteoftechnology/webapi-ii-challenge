import React from 'react';
import Post from '../Components/Post';
import Axios from 'axios';


class PostsList extends React.Component{
    constructor(){
        super();
        this.state = {
          posts:[]
        }
      }
      componentDidMount(){
        Axios.get('http://localhost:5050/api/posts')
             .then(response => {
                this.setState({posts:response.data})
                })
             .catch(error => console.log('error occured fetching data. ',error))
      }
      render() {
        return (
          <div className="App">
            {
                this.state.posts.map((post)=>{
                    return <Post key={post.id} post={post}></Post>
                })
            }
          </div>
        );
      }
    
}

export default PostsList