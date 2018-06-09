
import React from 'react'
import { connect } from 'react-redux'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core'

const Main = props => {
    return (
        <div>
          {Object.values(props.posts).map((user, key) => {
            return (
              <ExpansionPanel key={user.id} style={{background: 'black'}}>
                <ExpansionPanelSummary>
                  <Typography style={{margin: 'auto', color: 'white'}}> {user.title} </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{background: 'darkgray'}}>
                    <Typography style={{margin: 'auto', color: 'white'}}> {user.contents} </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
            )
          })}
          </div>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}
export default connect(mapStateToProps)(Main)