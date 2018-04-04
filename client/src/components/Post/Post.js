import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deletePost } from '../../actions';
import './Post.css';

const Post = (props) => {
    return (
        <div className="Post">
            <h3>{props.title}</h3>
            <h5>{props.contents}</h5>
            <button onClick={() => props.deletePost(props.id)}>Delete</button>
            <Link to={`/edit/${props.id}`}>Edit</Link>
        </div>
    )
}

export default connect(null, { deletePost })(Post);