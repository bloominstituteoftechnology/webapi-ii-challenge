import React from 'react';



const Hobbit = props => {

    return (
        <div>
            <h3>{props.post.title}</h3>
            <p>{props.post.contents}</p>
        </div>
    )
}






export default Hobbit;