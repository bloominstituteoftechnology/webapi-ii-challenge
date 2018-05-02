import React, { Component } from "react";

class PostCard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.propsPC.fetchPost();
  }

  render() {
    const postsArray = this.props.propsPC.posts;
    const index = this.props.match.params.id;

    return (
      <div>
        hello
        <div className="EachNote">
          <h1>{postsArray[index].title}</h1>
          <p>{postsArray[index].contents}</p>
        </div>
      </div>
    );
  }
}

export default PostCard;
