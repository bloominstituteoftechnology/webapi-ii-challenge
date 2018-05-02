import React, { Component } from "react";
import { Link } from "react-router-dom";



class List extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.propsList.fetchPost();
  }
  render() {
    return (
      <div>
        <h2>User Generated Posts:</h2>
        {this.props.propsList.posts.map((eachPost, index) => (
          <div key={index}>
            <Link to={`/api/posts/${index}`}>
              <div className="EachNote">
                <h1>{eachPost.title}</h1>
                <p>{eachPost.contents}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default List
