import React from 'react';

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      title: '',
      contents: '',
    })
  }

  componentDidMount(){
    if (this.props.post){
      this.setState({
        title: this.props.post.title,
        contents: this.props.post.contents,
      })
    }
  }

  submitHandler = event => {
    const post = {
      ...this.state,
    }
    event.preventDefault();
    if (this.props.post) {
      console.log('editing ', post); 
      this.props.submit(post);
      this.setState({
        title: '',
        contents: '',
      })
            this.props.history.push('/');

    } else {
      this.props.submit(post);
      this.setState({
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
