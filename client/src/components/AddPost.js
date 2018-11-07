import React, { Component } from 'react';
import { EventEmitter } from '../events';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      contents: ''
    };
  }

  addPost = event => {
    event.preventDefault();
    const { title, contents } = this.state;
    let newPost = { title, contents }
    EventEmitter.dispatch('addPost', newPost);
    this.setState({
      title: '',
      contents: '',
    });
    alert(`Post added!`)
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="add-post">
        <form className='add-form' onSubmit={this.addPost}>Write Post:
          <input
            className='input-add'
            onChange={this.handleInputChange}
            placeholder="Title"
            value={this.state.title}
            name="title"
          />
          <input
            className='input-add'
            onChange={this.handleInputChange}
            placeholder="Content"
            value={this.state.contents}
            name="contents"
          />
          <button className='submit-add' type="submit">Submit Post</button>
        </form>
      </div>
    );
  }
}

export default AddPost;