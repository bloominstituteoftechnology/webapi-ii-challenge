import React from 'react'
import styled from 'styled-components'
import Form from './Form'
import { Link } from 'react-router-dom'

/**
 * Styled-Components
 */

const PostCard = styled.div``

const Button = styled.button`
  width: 120px;
  height: 20px;
  font-family: 'Open Sans';
  font-size: 10px;
  border: 1px solid black;
  border-radius: 5px;
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
            this.props.deletePost(post.id) && this.props.history.push('/posts')
            this.setState({
              postDeleted: true
            })
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
        <Link to="/form/postform">Add</Link>
      </PostCard>
    )
  }
}

export default Post
