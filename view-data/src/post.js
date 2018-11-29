import React from 'react' 

export const Post = (props) => {
    return(
        <div>
          <h1>{props.title}</h1>
          <p>{props.contents}</p> 
        </div> 
    )
}

