import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
// import './Createpost.css';
import { Form, FormGroup, Input, Button } from 'reactstrap';

export default class CreatePost extends Component {
  state = {
    title: '',
    contents: '',
    fireRedirect: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ title: '', contents: '' });
    axios
      .post('http://localhost:5000/api/posts', {
        title: this.state.title,
        contents: this.state.contents
      })
      .then(response => {
        this.setState({ title: '', contents: '' });
        this.setState({ fireRedirect: true });
      })
      .catch(error => {
        console.log(`There was an error adding a new post: ${error}`);
      });
  };

  render() {
    const { from } = this.props.location.state || '/';
    const { fireRedirect } = this.state;

    return (
      <div>
        <h4 className="heading">Create New Post:</h4>
        <Form className="form">
          <FormGroup className="form-group">
            <Input
              className="input-title"
              type="text"
              name="title"
              placeholder="Post Title"
              onChange={this.handleChange}
              value={this.state.title}
            />
            <Input
              className="input-content"
              type="textarea"
              name="contents"
              placeholder="Post Content"
              onChange={this.handleChange}
              value={this.state.contents}
            />
          </FormGroup>
          <Button
            className="btn btn-block float-left save-button"
            onClick={this.handleSubmit}
          >
            Save
          </Button>
        </Form>
        {fireRedirect && <Redirect to={from || '/'} />}
      </div>
    );
  }
}
