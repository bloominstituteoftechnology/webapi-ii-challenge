import React from 'react';
import { Form } from '../components';


class AddView extends React.Component{
  render(){
    return (
      <div className='add-container'>
      <h2>Add a quote to our list</h2>
        <Form add='true' />
      </div>
    )
  }
}
export default AddView;
