import React from 'react';

const FormInput = props => {
  return (
    <div>
    <form>
      <input 
        onChange={props.handleChange}
        name="title"
        value={props.title}
        type="text"
        placeholder="Title"
       />
       <input 
        onChange={props.handleChange}
        name="contents"
        value={props.contents}
        type="text"
        placeholder="Content"
       />
       </form>
    </div>
  );
};

export default FormInput;
