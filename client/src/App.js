import React, { Component } from "react";
import axios from "axios";
// components
import SearchBar from "./components/SearchBar";
import Posts from "./components/Posts";
// styles
import "./styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  // fetch data from database localhost:5000
  componentDidMount() {
    this.getPostsList();
  }
  getPostsList() {
    axios
      .get("http://localhost:5000/api/posts")
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }
  // filter list of posts when a search is performed
  filterPostsList = searchQuery => {
    // title refers to the title of the post the user enters in the search bar
    // default search is search by title
    const searchResult = this.state.posts.filter(post => {
      return post.title === searchQuery;
    });
    // search by content
    if (searchResult.length === 0) {
      const searchByContents = this.state.posts.filter(post => {
        return post.contents === searchQuery;
      });
      this.setState({ posts: searchByContents });
    } else {
      this.setState({ posts: searchResult });
    }
  };

  render() {
    return (
      <div className="App">
        <SearchBar filterPostsList={this.filterPostsList} />
        {/* render Posts here */}
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
