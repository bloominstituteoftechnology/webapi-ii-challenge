import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import styled from "styled-components";

const Div = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  border: 3px solid rebeccapurple;
  background: papayawhip;
  margin-bottom: 3rem;
`;
const H1 = styled.h1`
  text-transform: uppercase;
`;
const P = styled.p`
  font-size: 1.2rem;
  text-transform: uppercase;
`;
const Span = styled.span`
  margin-left: 1rem;
  opacity: 0.5;
  font-size: 0.8rem;
`;
const Button = styled.button`
  display: block;
  width: 100%;
  cursor: pointer;
  border: 3px solid rebeccapurple;
  background: papayawhip;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 6px rebeccapurple;
  position: relative;
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: bolder;

  &:hover {
    top: 2px;
    box-shadow: 0 4px rebeccapurple;
  }
  &:active {
    top: 4px;
    box-shadow: 0 2px rebeccapurple;
  }
`;

export default class SinglePost extends Component {
  state = { post: [] };
  componentDidMount = () => {
    const id = this.props.match.params.postId;

    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then(({ data }) => this.setState({ post: data }))
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.post.length) {
      return <h1>loading...</h1>;
    } else {
      let { title, contents, created_at } = this.state.post[0];
      return (
        <div>
          <Div>
            <H1>{title}</H1>
            <P>
              {contents}
              <Span>
                <Moment format="Do MMM YYYY">{created_at}</Moment>
              </Span>
            </P>
          </Div>
          <Button onClick={() => this.props.history.push("/posts")}>
            Return to posts
          </Button>
        </div>
      );
    }
  }
}
