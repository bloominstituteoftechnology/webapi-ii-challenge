import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deletePost, editPost } from "../actions";
import trash from "../assets/delete.png";
import edit from "../assets/edit.png";
import close from "../assets/close.png";
import styled from "styled-components";
import Form from "./Form";

const Button = styled.button`
  border: none;
  padding: 2px 3px;
  border-radius: 2px;
  margin: 0 2px;
  img {
    height: 18px;
  }

  &:hover {
    background: #03dac5;
  }
`;
const ButtonWrapper = styled.div`
  margin: 5px 0;
  display: flex;
  justify-content: flex-end;
`;
const Header = styled.h3`
  padding: 5px;
`;

const Contents = styled.p`
  padding: 5px;
`;

class Post extends Component {
  state = {
    editable: false,
    title: "",
    contents: "",
  };

  componentDidMount() {
    this.setState({
      title: this.props.post.title,
      contents: this.props.post.contents,
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.editPost(this.props.post.id, {
      title: this.state.title,
      contents: this.state.contents,
    });
    this.setState({ editable: false });
  };

  render() {
    return (
      <Fragment>
        {this.state.editable ? (
          <Fragment>
            <Form
              title={this.state.title}
              contents={this.state.contents}
              onChange={e => this.setState({ [e.target.name]: e.target.value })}
              handleSubmit={this.onSubmit}
            />{" "}
            <Button style={{float: 'right'}} onClick={() => this.setState({ editable: false })}>
              <img src={close} />{" "}
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <ButtonWrapper>
              <Button onClick={() => this.setState({ editable: true })}>
                <img src={edit} />
              </Button>
              <Button onClick={() => this.props.deletePost(this.props.post.id)}>
                <img src={trash} />
              </Button>
            </ButtonWrapper>
            <Header>{this.props.post.title}</Header>
            <Contents>{this.props.post.contents}</Contents>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
});

export default connect(
  mapStateToProps,
  { deletePost, editPost }
)(Post);
