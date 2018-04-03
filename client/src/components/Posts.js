import React from "react";


const Posts = props => {

	return (
		<div className="Posts">
			<h1>Posts</h1>
				<ul>
				{props.posts.map(post => {
					return (
					 <div className="Post" key={post.id}>
					   <h3>{post.title}</h3>
					   <p>{post.contents}</p>
					 </div>
					);
				  })
				}
				</ul>
		</div>
	);
}

export default Posts;