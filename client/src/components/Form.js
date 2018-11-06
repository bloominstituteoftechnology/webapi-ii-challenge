import React from 'react';

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      id: null,
      title: '',
      contents: '',
    })
  }

  componentDidMount(){
    if (this.props.post){
      this.setState({
        id: this.props.post.id,
        title: this.props.post.title,
        contents: this.props.post.contents,
      })
    }
  }

  submitHandler = event => {
    event.preventDefault();
    if (this.props.post) {
      console.log('form and a post');
      const post = {
        ...this.state,
      }
      this.props.submit(post);
      this.setState({
        id: null,
        title: '',
        contents: '',
      })
      this.props.history.push('/');
    } else {
      console.log('form and adding')
      const post = {
        title: this.state.title,
        contents: this.state.contents,
      }
      this.props.submit(post);
      this.setState({
        id: null,
        title: '',
        contents: '',
      });
      this.props.history.push('/');
      window.location.reload(); 
    }
  }

  inputHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render(){
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.add &&
        <input
          type='text'
          name='title'
          onChange={this.inputHandler}
          placeholder='title'
          value={this.state.title}
        />}
        <input
          type='text'
          name='contents'
          onChange={this.inputHandler}
          placeholder='guess'
          value={this.state.contents}
        />
        <button type='submit' className='button submit-button'>
          {this.props.add ? 'Add quote' : 'Save changes'}
        </button>
      </form>
    )
  }
}
export default Form;
