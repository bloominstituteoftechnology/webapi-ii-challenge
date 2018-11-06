import React from 'react'
import styled from 'styled-components'
import Form from './Form'
import { Link } from 'react-router-dom'

/**
 * Styled-Components
 */

const PostCard = styled.div`
  text-align: center;
  display: flex;
  flex-flow: column nowrap;

  h2 {
    font-size: 38px;
  }

  p {
    font-size: 24px;
  }
`

const Button = styled.button`
  width: 60px;
  height: 30px;
  padding: 6px 0;
  font-family: 'Open Sans';
  font-size: 14px;
  border: 2px solid black;
  border-radius: 5px;
  margin: 40px auto;
`

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const post = this.props.posts.find(post => `${post.id}` === this.props.match.params.id)
    return (
      <PostCard>
        <h2>{post.title}</h2>
        <p>{post.contents}</p>
        <Button
          onClick={() => {
            this.props.history.push('/posts')
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            this.props.deletePost(post.id)
            this.setState({
              postDeleted: true
            })
            this.props.history.push('/posts')
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            this.props.history.push('/posts')
          }}
        >
          Back
        </Button>
      </PostCard>
    )
  }
}

export default Post
