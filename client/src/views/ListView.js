import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PostList } from '../components';

class ListView extends React.Component {
  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:9000/api/posts')
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
      .catch(error => console.log(error));
  }
  render() {
    if (this.state.posts.length === 0){
      return (
        <div className='loading'>
          <h2>Loading posts...</h2>
        </div>
      )
    }
    return (
    <div className='list-wrapper'>
      <Link to='/add' className='button add-button'>
        Add a quote
      </Link>
      <PostList posts={this.state.posts} />
    </div>
    );
  }
}

export default ListView;
