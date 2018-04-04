import React from 'react';
import axios from 'axios';
import DeleteNote from './DeleteNote';

class Note extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      post: []
    }
  }

  componentDidMount() { 
    let id = this.props.match.params.id;

    axios
      .get(`http://localhost:5001/api/posts/${id}`)
      .then(response => {
        this.setState({ post: response.data })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <button onClick={() => DeleteNote(this.props.match.params.id)}> one click delete </button>
        <div className='singleCard' key={this.state.post.id}>
          <p>{this.state.post.title}</p>
          <p>{this.state.post.contents}</p>
        </div>
      </div>
    )
  }
};

export default Note;