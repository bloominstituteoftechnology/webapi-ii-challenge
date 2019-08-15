import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {
    Card,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap'

class Posts extends Component {
    constructor(props) {
      super(props)
      this.state = {
        title: '',
        contents: ''
      }
    }

    deletePost = e => {
      e.preventDefault();
      const id = this.props.match.params.id
      console.log(id)
  
      axios
        .delete(`https://lotr-users.herokuapp.com/api/posts/${id}`)
        .then(response => {
          console.log(response.data);
          this.props.updatePosts(response.data);
          this.setState({
            title: "",
            contents: ""
          });
        })
        .catch(err => {
          console.log("Error: ", err)
        });
    };
  
    render() {
      return (
        <div className="Posts">
          <h1>Gondor</h1>
          <ul>
            {this.props.posts.map(post=> {
              return (
                <Link to={`/posts/${post.id}`} key={post.id}>
                  <Card key={post.id}>
                    <CardBody>
                      <CardTitle>{post.title}</CardTitle>
                      <CardText>{post.contents}</CardText>
                      <button onClick = {this.deletePost}>🧺</button>
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </ul>
        </div>
      );
    }
  }
  
  Posts.defaultProps = {
    posts: []
  };
  

export default Posts