import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deletePost, editPost } from "../actions";
import trash from '../assets/delete.png';
import edit from '../assets/edit.png';
import styled from "styled-components";
import Form from './Form';

const Button = styled.button`
  border: none;
  padding: 2px 3px;
  border-radius: 2px;
  margin: 0 2px;
  img {
    height: 18px;
  };

  &:hover{
    background: #03DAC5;
  }
`
const ButtonWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
`

class Post extends Component {
  state = {
    editable: false,
    title: "",
    contents: "",
  };

  componentDidMount() {
    this.setState({title: this.props.post.title, contents: this.props.post.contents})
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.editPost(this.props.post.id, ({title: this.state.title, contents: this.state.contents}));
    this.setState({editable: false})
  }

  render() {
    return (
      <Fragment>
        {this.state.editable ? (
          <Form
            title={this.state.title}
            contents={this.state.contents}
            onChange={e => this.setState({[e.target.name]: e.target.value})} 
            handleSubmit={this.onSubmit} 
            />
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
            <h3>{this.props.post.title}</h3>
            <p>{this.props.post.contents}</p>
            
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
});

export default connect(mapStateToProps, {deletePost, editPost})(Post);
