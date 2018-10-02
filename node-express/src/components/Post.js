export default function Post(props) {
    const post = props.posts.find(post => post.id === props.match.params.id);

    function handleDelete() {
        
    }

    if (props.fetchingPosts)
}

