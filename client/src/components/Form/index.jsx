import React from "react";
import "../components.css";
import "./index.css";

const Form = props => {
  const heading = props.type === "new" ? "Create New Post:" : "Edit Post:";
  const buttonName = props.type === "new" ? "Save" : "Update";

  return (
    <div className="main-container form">
      <h2>{heading}</h2>
      <form>
        <input
          type="text"
          name="title"
          maxLength="20"
          placeholder="Post Title"
          value={props.title}
          onChange={props.handleInputChange}
        />
        <textarea
          type="text"
          name="contents"
          placeholder="Post Content"
          value={props.contents}
          onChange={props.handleInputChange}
        />
        <button onClick={props.handleFormSubmit}>{buttonName}</button>
      </form>
    </div>
  );
};

export default Form;
