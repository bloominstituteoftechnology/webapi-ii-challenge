import React from 'react';

export default class Post extends React.Component {
    render() {
        return(
            <div className='post'>
                <p>{this.props.post.title}</p>
                <h3>{this.props.post.contents}</h3>
            </div>
        )
    }
}