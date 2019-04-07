// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import tractorIcon from '../assets/icons/tractorIcon.png';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Home extends Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} data-tid="container">
        <img
          styles={{ width: 50, height: 50, backgroundColor: 'white' }}
          src={tractorIcon}
        />
        <Typography variant="h3">Welcome to Farmicity</Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
