import React from 'react';
import axios from 'axios';

class NotesList extends React.Component {
  constructor() {
    super()

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:5001/api/posts')
      .then(response => {
        this.setState({ posts: response.data })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      this.state.posts.map(post => {
        return (
        <div className='noteCard' key={post.id}>
          <p>{post.title}</p>
          <p>{post.contents}</p>
        </div>
        )
      })
    )
  }
};

export default NotesList;