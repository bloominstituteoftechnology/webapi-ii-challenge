import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      // <Link to='/addnote'>Add a new note</Link>
      this.state.posts.map(post => {
        return (
        <div className='noteCard' key={post.id}>
        <Link to={`viewnote/${post.id}`}>
          <p>{post.title}</p>
          <p>{post.contents}</p>
        </Link>
        </div>
        )
      })
    )
  }
};

export default NotesList;