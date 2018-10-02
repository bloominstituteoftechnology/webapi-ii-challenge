import React, { Component } from "react";
import axios from "axios";
import styled from "react-emotion";

class UserList extends Component {
  state = {
    posts: [],
    titleInput: "",
    contentsInput: "",
    idInput: ""
  };
  handleInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  postInput = () => {
    if (!this.state.idInput) {
      axios
        .post("http://localhost:8000/api/posts", {
          title: this.state.titleInput,
          contents: this.state.contentsInput
        })
        .then(res => {
          this.setState({
            posts: res.data
          });
        });
    } else {
      this.updatePost(parseInt(this.state.idInput));
    }
  };

  deletePost = id => {
    axios.delete(`http://localhost:8000/api/posts/${id}`).then(res => {
      this.setState({
        posts: res.data
      });
    });
  };

  updatePost = id => {
    axios
      .put(`http://localhost:8000/api/posts/${id}`, {
        title: this.state.titleInput,
        contents: this.state.contentsInput
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          posts: res.data
        });
      });
  };

  render() {
    const { posts, titleInput, contentsInput, idInput } = this.state;
    return (
      <div>
        <StyledInputWrapper>
          <h4>Title:</h4>

          <input
            onChange={this.handleInput}
            name="titleInput"
            value={titleInput}
          />
          <h4>Contents</h4>
          <input
            onChange={this.handleInput}
            name="contentsInput"
            value={contentsInput}
          />
          <h4>ID</h4>
          <input onChange={this.handleInput} name="idInput" value={idInput} />
          <StyledButton type="button" onClick={this.postInput}>
            Sumbit
          </StyledButton>
        </StyledInputWrapper>

        <h1>Post List</h1>
        <StyledCardWrapper>
          {posts.length > 1 ? (
            posts.map(post => {
              return (
                <StyledCard>
                  <h2>
                    {post.title}, {post.id}
                  </h2>
                  <p>{post.contents}</p>
                  <StyledDelete
                    type="button"
                    onClick={() => this.deletePost(post.id)}
                  >
                    Delete
                  </StyledDelete>
                </StyledCard>
              );
            })
          ) : (
            <h2>Loading</h2>
          )}
        </StyledCardWrapper>
      </div>
    );
  }
  componentDidMount() {
    axios.get("http://localhost:8000/api/posts").then(res => {
      console.log(res);
      this.setState({
        posts: res.data
      });
    });
  }
}

export default UserList;

const StyledInputWrapper = styled("div")`
  padding: 10px;
  background: red;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    margin: 0 10px;
    height: 10px;
  }
`;

const StyledButton = styled("button")`
  border: none;
  color: white;
  background: red;
  padding: 10px 20px;
  font-weight: bold;
  :hover {
    color: red;
    background: white;
  }
`;

const StyledCardWrapper = styled('div')`
display:flex;
justify-content: space-evenly;
flex-wrap: wrap;
width: 1200px;
margin: auto;
`

const StyledCard = styled('div')`
display: flex;
    flex-direction: column;
    text-align: center;

padding: 10px;
margin: 10px 0;
width: 360px;
height: 360px;
border: 1px solid black;
:hover {
  color:white;
  background:red;
}

transition: all 0.2s;
`

const StyledDelete = styled('div')`
font-weight:bold;
transition: transform 0.2s;
:hover{
  transform:scale(1.1)
}
:active{
  transform:scale(1.0)
}
`
