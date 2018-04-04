import React from 'react';
import axios from 'axios';

class EditNote extends React.Component {

  render () {
    let postTitle;
    let postContents;

    return (
      <div className='noteForm'>
        <h3>Edit Note:</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!postTitle.value.trim() || !postContents.value.trim()) {
              return
            };
            // console.log(this.props.match.params.id, postTitle.value, postContents.value);
            let id = this.props.match.params.id;
            axios
              .put(`http://localhost:5001/api/posts/${id}`, {
                id: this.props.match.params.id,
                title: postTitle.value,
                contents: postContents.value
              })
              .then(response => {
              console.log(response);
              })
              .catch(error => {
                console.log(error);
              })
            postTitle.value = ''
            postContents.value = ''
           }}
        >
          <input ref={node => postTitle = node} placeholder='Note Title' className='noteTitle'/><br/>
          <input ref={node => postContents = node} placeholder='Note Content' className='noteContent'/><br/>
          <button type="submit">
            Save
          </button>
        </form>
      </div>
    )
  }
}

export default EditNote;