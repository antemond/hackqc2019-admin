import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HttpClient from '../../services/HttpClient';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    maxHeight: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

type State = {
  orgs: any[],
};

type Props = {
  classes: any,
  history: {
    push: Function,
  },
};

class OrgList extends React.Component<Props, State>{

  constructor(props) {
    super(props);

    this.state = {
      orgs: [],
    }
  }

  async componentDidMount() {
    const result = await HttpClient.get('organizations', undefined);

    this.setState({ orgs: result.organizations })
  }

  navigateToOrg = (org) => {
    this.props.history.push(`/org/${org.reference}`, { org: org })
  }

  render() {
    const { classes } = this.props;
    const { orgs } = this.state;
    return (
      <List className={classes.root}>
        {
          orgs.map(organization => (
            <ListItem button key={organization.reference} onClick={() => this.navigateToOrg(organization)}>
              <ListItemText primary={organization.name} secondary={organization.address} />
            </ListItem>
          ))
        }
      </List>
    );
  }
}

export default withRouter(withStyles(styles)(OrgList));

