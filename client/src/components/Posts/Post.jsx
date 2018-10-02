import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Button, CardFooter, CardHeader } from 'mdbreact';

function Post(props) {
    return (
        <div>
            <Card style={{marginTop: '1rem'}}>
            <NavLink to={`/posts/${props.post.id}`} ><CardHeader>POST</CardHeader></NavLink>
                
                <CardBody>
                    <CardTitle color='pink lighten-2' tag="h3">{props.post.title}</CardTitle>
                    <CardText>{props.post.contents}</CardText>
                    <NavLink to="/form"><Button color="pink lighten-2" onClick={event => props.handleUpdate(event, props.post.id)}>Edit</Button></NavLink>
                    <Button color="danger" onClick={event => props.handleDelete(props.post.id)}>Delete</Button>
                </CardBody>
                <CardFooter color="pink lighten-1">{props.post.created_at}</CardFooter>
            </Card>
        </div>
    )
};

export default Post;