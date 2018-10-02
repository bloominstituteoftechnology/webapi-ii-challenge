// import React from "react";

// const Post = props => {
//   return (
//     <div className="post-wrapper">
//       <h2>{props.title}</h2>
//       <h3>{props.contents}</h3>
//     </div>
//   );
// };

// export default Post;
import React, { Component } from "react";
import axios from "axios";
import Modal from "react-modal";

import Form from "../Form";
import "../components.css";
import "./index.css";
export default class Post extends Component {
  state = {
    isEditing: false,
    post: null,
    title: "",
    contents: ""
  };

  get id() {
    return this.props.match.params.id;
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/posts/${this.id}`)
      .then(response => {
        this.setState({
          post: response.data[0],
          title: response.data[0].title,
          contents: response.data[0].contents
        });
      })
      .catch(error => console.log(error));
  }

  // handle input change
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handle edit submit
  handleEditSubmit = e => {
    e.preventDefault();

    const editedPost = {
      title: this.state.title,
      contents: this.state.contents
    };

    axios
      .put(`http://localhost:8000/api/posts/${this.id}`, editedPost)
      .then(response => {
        this.props.refetchPosts();
        this.setState({
          isEditing: false,
          post: response.data,
          title: response.data.title,
          contents: response.data.contents
        });
      })
      .catch(error => console.log(error));
  };

  // turn on the edit mode by changing the isEditing to true
  toggleEditMode = e => {
    e.preventDefault();
    this.setState({ isEditing: true });
  };

  // open modal
  openModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  // handle delete
  handleDelete = e => {
    e.preventDefault();

    axios
      .delete(`http://localhost:8000/api/posts/${this.id}`)
      .then(response => {
        this.props.refetchPosts();
        this.setState({
          isEditing: false,
          post: null,
          title: "",
          contents: ""
        });
      })
      .catch(error => console.log(error));

    this.props.history.push("/");
  };

  render() {
    if (!this.state.post) {
      return <div className="main-container Post">Post is loading...</div>;
    }
    // if isEditing then render the form
    if (this.state.isEditing) {
      return (
        <Form
          type={"edit"}
          title={this.state.title}
          contents={this.state.contents}
          handleFormSubmit={this.handleEditSubmit}
          handleInputChange={this.handleInputChange}
        />
      );
    }

    return (
      <div className="main-container post">
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="modal"
          overlayClassName="overlay"
        >
          <h3>Are you sure you want to delete this?</h3>
          <div className="modal-buttons">
            <button onClick={this.handleDelete}>Delete</button>
            <button onClick={this.closeModal}>No</button>
          </div>
        </Modal>
        <div className="actions-container">
          <h5 onClick={this.toggleEditMode}>edit</h5>
          <h5 onClick={this.openModal}>delete</h5>
        </div>
        <h2>{this.state.title}</h2>
        <div className="Post-body">{this.state.contents}</div>
      </div>
    );
  }
}
