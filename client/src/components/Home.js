import React from 'react';
import NavLink from '../../node_modules/react-router-dom/NavLink';

const Home = (props) => {
    return(
        <div className="Home">
            {props.posts.map(post => {
                return (
                    <NavLink to="/"><p>{`${post.title} - ${post.contents}`}</p></NavLink>
                );
            })}
        </div>
    );
};

export default Home;
