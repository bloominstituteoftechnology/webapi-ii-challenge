import React, { Component } from 'react';
import logo from '../logo.svg'
import { connect } from 'react-redux'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core'
import { fetchPosts } from '../actions'
import '../stylesheets/App.css'

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header" style={{background: 'black'}}>
          {this.props.loading ? (
            <React.Fragment>
              <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Node Express Lab is Working</h1> </React.Fragment>
          ) : <h1 className="App-title">Welcome to Node Express Lab </h1>}
        </header>
        <div> 
          {Object.values(this.props.posts).map((user, key) => {
            return (
              <ExpansionPanel key={user.id} style={{background: 'black'}}>
                <ExpansionPanelSummary>
                  <Typography style={{margin: 'auto', color: 'white'}}> {user.title} </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography style={{margin: 'auto', color: 'white'}}> {user.contents} </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
            )
          })}
         </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.loading,
    posts: state.posts
  }
}
export default connect(mapStateToProps, { fetchPosts })(App)
