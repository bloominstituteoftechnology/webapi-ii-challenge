import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Main from './Main'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    background: 'black',
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor: 'black',
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
      position: 'fixed'
});

function ClippedDrawer(props) {
  const { classes } = props;

  return (
    <div className={classes.root} style={{height: '100vh'}}>
    <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}/>
        <List>####</List>
        <Divider />
        <List>####</List>
      </Drawer>
    <main className={classes.content}>
        <div className={classes.toolbar} />
      <Main />
      </main>
      </div>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer)