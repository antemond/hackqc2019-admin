import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import HttpClient from '../../services/HttpClient';
import OrgInfo from './OrgInfo';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

type Props = {
  match: {
    params: {
      id: string
    }
  },
  classes: any,
  history: any,
};

type State = {
  tab: number,
  org: any,
};

class OrgDetails extends React.Component<Props,State> {
  constructor(props) {
    super(props)

    this.state = {
      tab:0,
      org: undefined,
    }
  }

  async componentDidMount() {
    const org = await HttpClient.get(`organizations/${this.props.match.params.id}`,undefined);
    this.setState({org})
  }

  handleChange = (event, tab) => {
    this.setState({ tab });
  };

  render() {
    const { classes } = this.props;
    const { tab, org } = this.state;
    console.log(this.props)
    return (
        <div style={{display:'flex', justifyContent: 'center'}}>
          <Paper style={{width: '60%', alignSelf: 'center'}}>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={tab} onChange={this.handleChange}>
            <Tab label="Information" />
            <Tab label="Statistique" />
          </Tabs>
        </AppBar>
        {tab === 0 && <TabContainer><OrgInfo org={org} /></TabContainer>}
        {tab === 1 && <TabContainer>Statistique</TabContainer>}
      </div>
      </Paper>
        </div>
    );
  }
}
export default withRouter(withStyles(styles)(OrgDetails));