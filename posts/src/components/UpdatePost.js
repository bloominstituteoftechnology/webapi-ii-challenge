import React from "react";
import { updatePost } from "../actions";
import { connect } from "react-redux";

class UpdatePost extends React.Component {
  state = {
    title: ""
  };
  onSubmitHandler = e => {
    this.props.updatePost(this.props.id, this.state.title);
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <form onSubmit={this.onSubmitHandler}>
        <input
          onChange={this.onChangeHandler}
          name="title"
          placeholder="Title"
          defaultValue={this.props.title}
        />
        <button onClick={this.onSubmitHandler}>Update Post</button>
      </form>
    );
  }
}

export default connect(
  null,
  { updatePost }
)(UpdatePost);
