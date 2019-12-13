import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Grid item xs>
            <Typography variant="h6" color="inherit">
              WalletConnect Ticket dApp
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" color="inherit">
              by using 3Box Storage
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
