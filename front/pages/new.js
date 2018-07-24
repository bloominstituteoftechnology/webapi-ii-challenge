import { Container, FlexCenter } from '../components/Containers'
import Button from '../components/Button'
import Router from 'next/router'
import { post } from 'axios'

const NewPost = class extends React.Component { 

  state = {
    title: '',
    contents: ''
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  save = () => {
    post('http://localhost:5000/api/posts', this.state)
    window.location = '/'
  }

  render() {
    return  <>
      <Container>
        <h1>Title:</h1>
        <input 
          onChange={this.handleChange}
          type="text" 
          name="title" />
        <h1>Contents: </h1>
        <textarea 
          onChange={this.handleChange}
          style={{ height: '100%', width: '100%' }} 
          name="contents"
        />
      </Container>
      <FlexCenter>
        <Button onClick={this.save}>Save</Button>
      </FlexCenter>
    </>
  }
}


export default NewPost
