import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import axios from 'axios';

class ContentsList extends Component {
    constructor(props) {
        super(props);
    }

    deleteContent = ( id ) => {
        axios
          .delete(`http://localhost:5000/api/posts/${id}`)
          .then(res => { this.setState({ posts: res.data.posts });
          })
          .catch(error => {
            console.log(error)
          })
      }

    render() {
        console.log('props', this.props)
        return (
            <div className='row boxes'>
                {this.props.posts.map(post => {
                    return (
                        <div className='col-12 col-sm-6 col-md-4' key={post.id}>
                            <Card className ='card'>
                                <div className='content-inside'>
                                    <CardTitle>{post.contents}</CardTitle>
                                    <CardText>{post.title}</CardText> 
                                </div>                       
                                <button className='content-btn update'>Update</button>
                                <button onClick={this.deleteContent} className='content-btn delete'>Delete</button>
                            </Card>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default ContentsList;