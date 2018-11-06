import React from 'react'
import axios from 'axios'

export default class PostForm extends React.Component {
  state = {
    title: '',
    contents: '',
    id: null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    axios
      .post('http://localhost:8000/api/posts', { "title": this.state.title, "contents": this.state.contents })
      .then(res => {
        this.setState({
          id: res.data
        })
      })
      .catch(e => console.log(e))

      this.props.history.push('/posts')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title</label>
        <input name="title" type="text" onChange={this.handleChange} />
        <label>Contents</label>
        <input name="contents" type="text" onChange={this.handleChange} />
        <input type="submit" value="add" />
      </form>
    )
  }
}
