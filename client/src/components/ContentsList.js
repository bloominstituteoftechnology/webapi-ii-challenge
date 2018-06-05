import React, { Component } from 'react';

class ContentsList extends Component {
    render() {
        return (
            <div>
                {this.props.posts.map(post => {
                    return (
                        <div key={post.id}>
                            <p>{post.title}</p>
                            <h6>{post.contents}</h6>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default ContentsList;