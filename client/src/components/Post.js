import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const postSource = {
  beginDrag(props) {
    return props.post;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleDrop(props.post.id);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

class Post extends Component {
  render() {
    const { post, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0 : 1;
    const width = isDragging ? '50px' : '200px';
    return connectDragSource(
      <div className="Post" style={{ opacity, width }}>
        <div>{post.contents}:</div>
        <h3 className="PostTitle">{post.title}</h3>
      </div>
    );
  }
}

export default DragSource('post', postSource, collect)(Post);
