import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import axios from 'axios'

class App extends Component {
  state = {
    posts: [],
    isGettingPosts: false,
    isCreatingPost: false,
    title: "",
    contents: "",
  }

  getPosts = () => {
    axios.get('http://localhost:8000/api/posts')
      .then(res => {
        this.setState({ posts: res.data, isGettingPosts: true })
      })
      .catch(err => console.log(err.response.data.error))
    }
    
  createPost = () => {
    this.setState({ isGettingPosts: false, isCreatingPost: true })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newPost = {
      title: this.state.title,
      contents: this.state.contents,
    }
    axios.post ('http://localhost:8000/api/posts', newPost)
      .then(res => {
        this.getPosts()
        this.setState({ 
          posts: [...this.state.posts, res.data],
          isGettingPosts: true,
          isCreatingPost: false,
          title: "",
          contents: "",
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Div1 className="App">
        <H11>App Class Component</H11>
        <Button1
          onClick={this.getPosts}
        >
          GET request
        </Button1>
        <Button1
          onClick={this.createPost}
        >
          POST request
        </Button1>

        { this.state.isGettingPosts && (
            this.state.posts.map(post => {
              return (
                <Div2 className="Post" key={post.id}>
                  <H31>{post.title}</H31>
                  <P1>-{post.contents}</P1>
                </Div2>
              )
            })
          )
        }

        { this.state.isCreatingPost && (
            <Form1 onSubmit={(e) => this.handleSubmit(e)}>
              <Input1
                name="title"
                type="text"
                value={this.state.title}
                placeholder="Title"
                onChange={this.handleChange}
              />
              <Input1
                name="contents"
                type="text"
                value={this.state.contents}
                placeholder="Contents"
                onChange={this.handleChange}
              />
              <Button1>Submit</Button1>
            </Form1>
          )
        }
        <GlobalStyle />
      </Div1>
    )
  }
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,
  body {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 0;
    font-size: 62.5%;
    border: 1px solid black;
    text-align: center;
  }
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.4rem;
  }
  h3 {
    font-size: 2rem;
  }
  p {
    font-size: 1.6rem;
  }
`
const Div1 = styled.div``
const Div2 = styled.div``
const H11 = styled.h1``
const H31 = styled.h3``
const P1 = styled.p``
const Button1 = styled.button``
const Form1 = styled.form``
const Input1 = styled.input``

export default App
