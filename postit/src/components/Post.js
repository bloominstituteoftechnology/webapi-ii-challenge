import React from 'react'
import { connect } from 'react-redux'
// import Posts from './Posts';



const Post = ({ post }) => {


    return (
        <div key={post.id} className='post-card'>
            <h2>{post.title}</h2>
            <p>{post.contents}</p>
        </div>
    )

}



const mapStateToProps = () => ({})

export default connect (mapStateToProps)(Post)