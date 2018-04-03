import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import './ListView.css';

export default class ListView extends Component {
  state = {
    posts: [],
    search: ''
  };

  updateSearch = e => {
    if (e.target.value.length < this.state.search.length) {
      this.getposts();
      // this.filterAndChange(); // How to refilter at current value?
    }
    this.setState({ search: e.target.value });
    this.filterAndChange();
  };

  //filters the state to match values for onChange event

  filterAndChange = () => {
    let filterposts = this.state.posts.filter(post => {
      if (
        post.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1 ||
        post.contents.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
      ) {
        return true;
      }
    });
    this.setState({ posts: filterposts });
  };

  getposts = () => {
    axios
      .get('http://localhost:5000/api/posts')
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.log(`There was an error getting posts: ${error}`);
      });
  };

  componentDidMount = () => {
    this.getposts();
  };

  render() {
    console.log(this.state.posts);
    return (
      <div className="container">
        <div className="d-flex align-items-baseline mb-3">
          <h4>Your posts:</h4>
          <nav className="navbar navbar-light">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.search}
                onChange={this.updateSearch}
              />
              <button className="btn my-2 my-sm-0 search-button" type="submit">
                Search
              </button>
            </form>
          </nav>
        </div>
        <div className="row">
          {this.state.posts.map(post => {
            return (
              <div className="col-lg-4 col-md-8 col-sm-12" key={post.id}>
                <Link
                  to={`/postview/${post.id}`}
                  style={{ textDecoration: 'none' }}
                  className="card"
                >
                  <div className="card-block">
                    <h5 className="text-truncate card-title">{post.title}</h5>
                    <div className="text-truncate card-text">
                      {post.contents}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
