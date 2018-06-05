import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';

class ContentsList extends Component {
    render() {
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
                                <button className='content-btn delete'>Delete</button>
                            </Card>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default ContentsList;