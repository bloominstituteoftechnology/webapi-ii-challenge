import React from 'react';
import Post from './Post';

class Posts extends Component {
    render() {
    return (
        <div>
        <ul>
        {this.props.posts.map(post => {
            return (
                <Post
                title={post.title}
                contents={post.contents}
                key={post.id}
                />
            );
        })}
        </ul>
        </div>
    );
    }
}

export default Posts;