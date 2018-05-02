import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './PostForm.css';

const PostForm = props => {
  return (
    <Form onSubmit={props.addPost} className="postForm" inline>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="title" className="mr-sm-2">
          Title:
        </Label>
        <Input
          type="text"
          id="title"
          onChange={props.handleNewPost}
          placeholder="title"
          name="title"
          value={props.state.title}
          required
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="contents" className="mr-sm-2">
          Contents:
        </Label>
        <Input
          type="text"
          id="contents"
          onChange={props.handleNewPost}
          placeholder="contents"
          name="contents"
          value={props.state.contents}
          required
        />
      </FormGroup>
      <Button>Add New Post</Button>
    </Form>
  );
};

export default PostForm;
