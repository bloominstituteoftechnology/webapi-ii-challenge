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
    console.log(postsArray[index])
    return (
      <div>
        hello
        <div className="EachNote">
          {postsArray[index].map((eachPost) => (
            <div key={index}>
              <div className="EachNote">
                <h1>{eachPost.title}</h1>
                <p>{eachPost.contents}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PostCard;
