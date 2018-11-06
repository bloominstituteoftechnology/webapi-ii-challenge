import React, { Component } from 'react';
import axios from 'axios';


export default class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state={
    };
  }
  componentDidMount() {
    const id = this.props.match.params;
    axios
      .get(`http://localhost:9000/api/posts/${id}`)
      .then(response => {
        console.log('this is my response: ', response.data)
        this.setState(() => ( response.data ));
      })
      .catch(err => {console.log(err)});
  }
  render() {
    return (
      <div>
        <h1>Something is jacked up</h1>
        {/* <p>{this.state.post.title}</p> */}
      </div>
    );
  }
}
