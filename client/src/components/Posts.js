import React from "react";
import uuid from "uuid-v4";
// components
import Post from "./Post";
// styles
import "../styles/Posts.css";

const Posts = props => {
	// console.log("POST PROPS: ", props);
	return (
		<div>
			{props.posts.map((post, index) => {
				return (
					<div key={uuid()} className="PostContainer">
						{/* single post rendered here */}
						<Post post={post} index={index} />
					</div>
				);
			})}
		</div>
	);
};

export default Posts;
