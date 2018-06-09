import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import ClippedDrawer from './Drawer'

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
        <ClippedDrawer />
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.loading,
  }
}
export default connect(mapStateToProps, { fetchPosts })(App)
