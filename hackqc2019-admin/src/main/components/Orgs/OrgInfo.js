import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '70%',
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  section2: {
    margin: theme.spacing.unit * 2,
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
});

type Props = {
  org: any,
  classes: any,
};

function OrgInfo(props: Props){
  const {org,classes} = props
  return (
    <div style={{display:'flex', justifyContent: 'center', flexDirection: 'column'}}>
      {!!org &&
        <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {org.name}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary">
          {org.description}
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        
      </div>
     
    </div>
      }
    </div>
  );
}

export default withStyles(styles)(OrgInfo);