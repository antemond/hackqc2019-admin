import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const rows = [
  {
    uuid: 123123,
    name: "L'Auberivière",
    description: 'sup dudes',
    position: {
      x: 0.0, 
      y: 0.0
    },
    services: [
      {
        reference: 1231231,
        type: 'food',
        amout: 5,
        title: 'Bol de soupe',
      }
    ]
  },
  {
    uuid: 12312312312,
    name: "L'Auberivière",
    description: 'sup dudes',
    position: {
      x: 0.0, 
      y: 0.0
    },
    services: [
      {
        reference: 12312222231,
        type: 'food',
        amout: 5,
        title: 'Bol de soupe',
      }
    ]
  },
  {
    uuid: 1231343,
    name: "L'Auberivière",
    description: 'sup dudes',
    position: {
      x: 0.0, 
      y: 0.0
    },
    services: [
      {
        reference: 1231231,
        type: 'food',
        amout: 5,
        title: 'Bol de soupe',
      }
    ]
  }
];



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    maxHeight: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function FolderList(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
      {
        rows.map(organisation => (
          <ListItem>
            <ListItemText primary="L'Auberivière" secondary="Ville de Québec" />
          </ListItem>
        ))
      }
    </List>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);

