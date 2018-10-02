import React from "react";
import "../CSS/Post.css";
import { connect } from "react-redux";
import { deletePost } from "../actions";
import UpdatePost from '../components/UpdatePost';

class Post extends React.Component {
  state = {
    title: '',
    showForm: false,
  }
  deleteHandler = (e) => {
    this.props.deletePost(this.props.post.id);
    window.location.reload();
  }
  toggleHandler = (e) => {
    this.setState({showForm: !this.state.showForm});
  }
  render() {
    return (
      <div>
        <p>
          <span className="bold">Title: </span>
          {this.props.post.title}
          <button onClick={this.deleteHandler}>Delet Post</button>
          <button onClick={this.toggleHandler}>Toggle Form</button>
        </p>
        {
          this.state.showForm ? <UpdatePost id={this.props.post.id} title={this.props.post.title} /> : null
        }
      </div>
    );
  }
}

export default connect(
  null,
  { deletePost }
)(Post);
