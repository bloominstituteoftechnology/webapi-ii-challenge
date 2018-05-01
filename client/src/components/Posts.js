import React from "react";
// components
import Post from "./Post";

const Posts = props => {
	// console.log("POST PROPS: ", props);
	return (
		<div>
			{props.posts.map((post, index) => {
				return (
					<div key={index}>
						{/* single post rendered here */}
						<Post post={post} index={index} />
					</div>
				);
			})}
		</div>
	);
};

export default Posts;
