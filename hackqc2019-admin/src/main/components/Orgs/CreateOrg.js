import React from 'react';
import { Paper, TextField, withStyles, Button } from '@material-ui/core';
import AddressInput from '../Map/AddressInput';
import HttpClient from '../../services/HttpClient';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

type Props = {
  classes: any,
};

type State = {
  name: string,
  description: string,
  position: {
    lon: number,
    lat: number,
  },
  address: any,
};

class CreateOrg extends React.Component<Props,State> {

  constructor(props) {
    super(props);

    this.state = { 
      name: '',
      description: '',
      position: {
        lat:0,
        lon:0
      },
      address: '',
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  submit = async () => {
    try {
      const result = await HttpClient.post('organizations',{...this.state, services:[]})
      //todo succes
    } catch(e) {
      //error
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div style={{display:'flex', justifyContent: 'center'}}>
        <Paper style={{width: '60%', alignSelf: 'center'}}>
          <form style={{margin: '40px',}} >
            <div style={{alignSelf: 'center',marginHorizontal: 30, display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems:'center'}}>
              <h3 style={{textAlign: 'center'}}>Créer une organisation</h3>
                <TextField
                id="name"
                label="Nom"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
                style={{width: '100%'}}
              />
              <TextField
                id="description"
                label="Description"
                value={this.state.description}
                className={classes.textField}
                onChange={this.handleChange('description')}
                margin="normal"
                style={{width: '100%'}}
                variant="outlined"
              />

              <AddressInput 
                value={this.state.address} 
                onChange={( value )=> this.setState({address: value})} 
                onSelect={({address,position})=>this.setState({address,position})} 
              />

              <Button variant="outlined" color="primary" onClick={this.submit} style={{width: '30%', marginTop: 20}}>
                Enregistrer
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CreateOrg);