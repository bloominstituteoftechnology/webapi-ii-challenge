import React, { Component } from "react";
import axios from "axios";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      contents: ""
    };
  }

  //Adds new note to API
  addNote = event => {
    event.preventDefault();

    //Validates form input
    if (this.state.title.length < 1 || this.state.contents.length < 1) {
      alert("Please fill out all fields!");
    }

    //Adds new note, renders the notes list, sets to top of page
    else {
      axios
        .post("https://node3-practice.herokuapp.com/api/posts", this.state)
        .then(() =>
          this.setState({
            title: "",
            contents: ""
          })
        )
        .catch(error => console.log(error));
      this.props.history.push("/");
      window.scrollTo(0, 0);
    }
  };

  //Change handler for form input
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="PostForm">
        <div className="add-header">
          {" "}
          <h1>Create New Note</h1>
        </div>
        <form onSubmit={this.addNote}>
          <div>
            <input
              onChange={this.handleInputChange}
              placeholder="Note Title"
              value={this.state.title}
              name="title"
            />
          </div>
          <div>
            <textarea
              onChange={this.handleInputChange}
              placeholder="Note Content"
              value={this.state.contents}
              name="contents"
            />
          </div>

          <div>
            <button className="form-submit" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PostForm;
