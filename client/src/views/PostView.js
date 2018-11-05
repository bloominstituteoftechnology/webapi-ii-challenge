import React from 'react';
import axios from 'axios';
import { Post } from '../components';


class PostView extends React.Component {
  constructor(){
    super();
    this.state = ({
      post: [],
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:9000/api/posts/${id}`)
      .then(response => {
        this.setState({
          post: response.data
        })
      })
      .catch(error => console.log(error));
  }
  render(){
    if (this.state.post.length === 0) {
      return (
        <div className='loading'>
          <h2>Loading post...</h2>
        </div>
        )
    }
    return(
      <Post post={this.state.post[0]} />
    )
  }
}
export default PostView;
