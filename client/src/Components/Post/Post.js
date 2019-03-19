import React from "react";
import axios from "axios";

import "./Post.css";

class Post extends React.Component {
  state = {
    post: null
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/api/posts/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
        this.setState({
          post: response.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.post) return <h2 id="loading">Loading...</h2>;
    return (
      <div className="post">
        <h2>{this.state.post.title}</h2>
        <p>{this.state.post.contents}</p>
      </div>
    );
  }
}

export default Post;
