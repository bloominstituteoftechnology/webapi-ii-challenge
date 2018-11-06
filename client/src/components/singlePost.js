import React, { Component } from 'react';
import axios from 'axios';


export default class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state={
      post: null
    };
  }
  componentDidMount() {
    const id = this.props.match.params;
    console.log('this is my id', id);
    this.singleNote(id);
  }
  singleNote(id) {
    console.log('this is the single note id', id)
    axios
      .get(`http://localhost:9000/api/posts/${id}`)
      .then(response => {
        console.log('this is my response: ', response.data)
        // this.setState(() => ({ post: response.data }));
      })
      .catch(err => {console.log(err)});
  };
  render() {
    return (
      <div>
        <h1>{this.state.post}</h1>
        {/* <p>{this.state.post.title}</p> */}
      </div>
    );
  }
}
