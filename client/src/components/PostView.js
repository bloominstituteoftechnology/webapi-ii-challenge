import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
// import './PostView.css';

class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      modal: false,
      fireRedirect: false
    };

    this.toggle = this.toggle.bind(this);
  }

  getPostById = () => {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then(response => {
        this.setState({ post: response.data });
      })
      .catch(error => {
        console.log(`There was an error getting posts: ${error}`);
      });
  };

  componentDidMount() {
    this.getPostById();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleDelete = id => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`)
      .then(response => {
        this.setState({ fireRedirect: true });
        this.setState({ post: response.data });
      })
      .catch(error => {
        console.log(`There was an error deleting Post: ${error}`);
      });
  };

  render() {
    const { from } = this.props.location.state || '/';
    const { fireRedirect } = this.state;
    console.log(this.state.post);

    return (
      <div className="container">
        <div className="modify-buttons">
          <Link to={`/editpost/${this.state.post.id}`}>
            <button className="edit-button">edit</button>
          </Link>
          <div>
            <button className="delete-button" onClick={this.toggle}>
              delete
            </button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className="modal-lg"
            >
              <ModalBody className="lead d-flex justify-content-center">
                Are you sure you want to delete this?
              </ModalBody>
              <ModalFooter className="lead d-flex justify-content-center">
                <div className="modal-button-left">
                  <Button
                    className="btn-lg modal-delete"
                    onClick={() => this.handleDelete(this.state.post.id)}
                  >
                    Delete
                  </Button>
                </div>

                <Button className="btn-lg modal-no" onClick={this.toggle}>
                  No
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
        <div className="post-view">
          <h4 className="heading">{this.state.post.title}</h4>
          <p className="content">{this.state.post.contents}</p>
        </div>
        {fireRedirect && <Redirect to={from || '/api/posts'} />}
      </div>
    );
  }
}

export default PostView;
