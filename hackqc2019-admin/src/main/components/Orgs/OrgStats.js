import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HttpClient from '../../services/HttpClient';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    flex: 1,
  },
  section2: {
    margin: theme.spacing.unit * 2,
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
  table: {
    minWidth: 700,
  },
});

type Props = {
  org: any,
  classes: any,
};

type State = {
  donations: any,
  transactions: any,
};

class OrgStats extends React.Component<Props,State>{

  constructor(props) {
    super(props);

    this.state ={
      donations: [],
      transactions: [],
    }
  }

  async componentDidMount() {
    const donations = await HttpClient.get(`organizations/${this.props.org.reference}/donations`)
    const transactions = await HttpClient.get(`organizations/${this.props.org.reference}/transactions`)
    this.setState({donations: donations.donations,transactions :transactions.transactions})
  }

  render(){
  const {org,classes} = this.props
  return (
    <div style={{display:'flex', justifyContent: 'center', flexDirection: 'column'}}>
      {!!org &&
        <div className={classes.root}>
      <div className={classes.section1}>
        <Paper style={{padding: 10,maxHeight: 300, overflowY: 'scroll'}}>
        <Typography color="textPrimary">
          Donations à l'organisme
        </Typography>
      <Table className={classes.table} >
        <TableHead>
          <TableRow>
            <TableCell>Montant donné</TableCell>
            <TableCell align="left">Date - Heure</TableCell>
            <TableCell align="left">Latitude</TableCell>
            <TableCell align="left">Longitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.donations.map(donation => (
            <TableRow key={donation.id}>
              <TableCell component="th" scope="row">
                {donation.amount}$
              </TableCell>
              <TableCell align="left">{donation.donated_at}</TableCell>
              <TableCell align="left">{donation.position.lat}</TableCell>
              <TableCell align="left">{donation.position.lon}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>

      <Paper style={{padding: 10, marginTop: 20, maxHeight: 300, overflowY: 'scroll'}}>
        <Typography color="textPrimary">
          Transaction à l'organisme
        </Typography>
      <Table className={classes.table} >
        <TableHead>
          <TableRow>
            <TableCell>Montant </TableCell>
            <TableCell align="left">Date - Heure</TableCell>
            <TableCell align="left">Service</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell component="th" scope="row">
                {transaction.amount}$
              </TableCell>
              <TableCell align="left">{transaction.redeemed_at}</TableCell>
              <TableCell align="left">{transaction.service}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
      
      </div>
      
    </div>
      }
    </div>
  );
}}

export default withStyles(styles)(OrgStats);