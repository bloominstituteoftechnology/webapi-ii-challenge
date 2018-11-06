import React from 'react';
import Hobbit from './hobbit';


const HobbitList = props => {

    return (
        <div>
            {props.posts.map(post => (
                <div key={post.id}>
                    <Hobbit post={post} />
                </div>
            ))}

        </div>
    )
}

export default HobbitList;