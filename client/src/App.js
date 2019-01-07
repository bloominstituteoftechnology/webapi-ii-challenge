import React, { Component } from "react";
import axios from "axios";
import { Card, CardTitle, CardText, CardBody, CardSubtitle } from "reactstrap";
import moment from "moment";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30px;
  background: lightskyblue;
`;

const PostWrapper = styled.div`
  margin: 20px 0;
  padding: 0;

  @media (max-width: 600px) {
    width: 100%;
  }
  @media (min-width: 601px) {
    width: 48%;
  }
  @media (min-width: 993px) {
    width: 31%;
  }
`;

class App extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:5005")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Container>
          {this.state.posts.map(post => (
            <PostWrapper>
              <Card
                body
                style={{ backgroundColor: "whitesand", borderColor: "#fff" }}
              >
                <CardBody>
                  <CardTitle>{post.contents}</CardTitle>
                  <CardText>{post.title}</CardText>
                  <CardSubtitle>
                    {moment(post.created_at).format("MMMM Do, YYYY")}
                  </CardSubtitle>
                </CardBody>
              </Card>
            </PostWrapper>
          ))}
        </Container>
      </div>
    );
  }
}

export default App;
