import React from 'react';

class Posts extends React.Component {
  /*
   *constructor() {
   *  super();
   *  this.state = {
   *    posts: [],
   *  };
   *}
   */

  /*
   *  componentDidUpdate(prevProps, prevState) {
   *    if (this.props !== this.prevProps) {
   *      console.log('update');
   *    }
   *  }
   *
   */
  render() {
    if (!this.props.posts.length) return <h2>loading</h2>;
    return (
      <div>
        <h2>Posts</h2>
        {this.props.posts.map((p, i) => (
          <div key={i}>
            <h3>{p.title}</h3>
            <p>{p.contents}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Posts;
