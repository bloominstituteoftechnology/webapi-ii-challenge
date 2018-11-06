import React from 'react';
import axios from 'axios';
import { Form } from '../components';


class AddView extends React.Component{

  addPost = post => {
    axios
      .post('http://localhost:9000/api/posts', post)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error));
  }
  render(){
    return (
      <div className='add-container'>
      <h2>Add a quote to our list</h2>
        <Form add='true' submit={this.addPost} history={this.props.history}/>
      </div>
    )
  }
}
export default AddView;
