import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SimpleMap from '../Map/SimpleMap';
import OrganisationServices from './OrganisationServices';
import HttpClient from '../../services/HttpClient';
import { runInThisContext } from 'vm';

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

class OrgInfo extends React.Component<Props>{

  getCode = async () => {
    const result = await HttpClient.get(`recipients/${this.props.org.reference}/tag`,undefined)
    window.open(result.qrcode_url, "_blank")
    console.log(result)
  }

  render(){
  const {org,classes} = this.props
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
        <Typography color="textSecondary" style={{marginTop: 15}}>
          {org.address}
        </Typography>
        <Button color="primary" variant="outlined" style={{marginTop: 10}} onClick={() => this.getCode() }>
        Imprimmer Code
      </Button>
        <Divider style={{marginTop: 10, marginBottom:20}} />
      <OrganisationServices organisation={org} />
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <SimpleMap position={org.position} />
      </div>
    </div>
      }
    </div>
  );
}}

export default withStyles(styles)(OrgInfo);