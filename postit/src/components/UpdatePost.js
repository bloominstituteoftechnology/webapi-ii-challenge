import React, { Component } from "react";
import { Form, Input, Button } from "../sytles/PostStyles";
import { connect } from "react-redux";
import { fetchPosts, updatePost } from "../actions/index";

class UpdatePost extends Component {
constructor(props) {
    super(props);
    this.state = {
    title: "",
    contents: ""
    };
}
handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
};
editPost = e => {
    e.preventDefault();
    this.props.updatePost(this.state);
    this.props.history.push(`/`);
};
componentDidMount = () => {
    const { posts, match } = this.props;
    const post = posts.find(post => match.params.id === `${post.id}`);
    this.setState(post);
};

render() {
    return ( <div>
        <h1>LOTR QUOTES Update</h1>
        <hr />
        <Form onSubmit={this.editPost}>
        <Input
            type="text"
            name="title"
            value={this.state.title}
            placeholder="Title"
            onChange={this.handleChange}
        />
        <Input
            name="contents"
            value={this.state.contents}
            id="post.id"
            onChange={this.handleChange}
            placeholder="Quote Content"
        />
        <br />
        <Button type="submit" value="Save">
            Update
        </Button>
        </Form>
    </div>
    );
}
}

const mapStateToProps = state => {
  return {
    posts: state.postReducer.posts
  };
};

export default connect(
  mapStateToProps,
  { fetchPosts, updatePost }
)(UpdatePost);
