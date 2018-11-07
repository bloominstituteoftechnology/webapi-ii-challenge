import React, { Component } from 'react';
import { EventEmitter } from '../events';

class Post extends Component {
	constructor(props) {
    super(props);
    this.state = {
    editingId: '',
    editedTitle: '',
    editedContents: '',
    };
  }
 
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  editPost = (id, title, contents) => {
    this.setState({
      editingId: id,
      editedTitle: title,
      editedContents: contents,
    })
  }

  submitEdit = event => {
    event.preventDefault();
    const { editingId, editedTitle, editedContents } = this.state;
    let editedPost = { id: editingId, title: editedTitle, contents: editedContents }
    EventEmitter.dispatch('updatePost', editedPost)
    this.setState({
      editingId: '',
      editedTitle: '',
      editedContents: ''
    })
  }

  render() {
    const { title, contents, id } = this.props.post;
    const { editingId, editedTitle, editedContents } = this.state;
    return (
      <div className="post">
        <h3 className='title'>{title}</h3>
        <p className='contents'>{contents}</p>
        <div className='post-btns'>
          <div 
            className='post-btn' 
            id={id} 
            onClick={() => this.editPost(id, title, contents)}>
            Edit
          </div>
          <div 
            className='post-btn'  
            onClick={() => EventEmitter.dispatch('deletePost', id)}>
            Delete
          </div>
        </div>
        <div className={editingId === id ? 'editing-form' : 'hidden'}>
          <form onSubmit={this.submitEdit}>
            <input
              className='edit-input'
              onChange={this.handleChange}
              placeholder="Title"
              value={editedTitle}
              name="editedTitle"
              required
            />
            <input
              className='edit-input'
              onChange={this.handleChange}
              placeholder="Content"
              value={editedContents}
              name="editedContents"
              required
            />
            <input className='submit-edit' type="submit" value="Submit Edits"/>
          </form>
        </div>
      </div>
    )
  }
};

export default Post;