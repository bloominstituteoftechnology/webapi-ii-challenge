import React, { Component } from 'react';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      contents: ''
    };
  }

  render() {
    return (
      <div>
        <form>
          <input
            name='title'
            placeholder='title'
            value={this.state.title}
          />
          <input
            name='contents'
            placeholder='contents'
            value={this.state.contents}
          />
          <button type='submit'>Add post</button>
        </form>
      </div>
    );
  }
}