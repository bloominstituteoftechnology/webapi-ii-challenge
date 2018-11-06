import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const collect = (connect, monitor) => {
  return {
    conncectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    post: monitor.getItem()
  };
};

class Target extends Component {
  render() {
    const { conncectDropTarget, hovered, post } = this.props;
    const color = hovered ? '#f9db42' : '#9d863e';
    return conncectDropTarget(
      <div className="Target">
        <i style={{ color }} class="fas fa-trash" />
      </div>
    );
  }
}

export default DropTarget('post', {}, collect)(Target);
