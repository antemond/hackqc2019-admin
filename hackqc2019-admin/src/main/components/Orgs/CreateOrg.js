import React from 'react';
import { Paper, TextField, withStyles, Button, FormGroup, FormControlLabel, Switch, CircularProgress } from '@material-ui/core';
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
  progress: {
    margin: theme.spacing.unit * 2,
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
  foodChecked: boolean,
  clothesChecked: boolean,
  shelterChecked: boolean,
  loading: boolean,
  error: boolean,
  loaded: boolean,
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
      foodChecked: false,
      clothesChecked: false,
      shelterChecked: false,
      loading: false,
      error: false,
      loaded: false,
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  submit = async () => {
    try {
      this.setState({loading: true, loaded: false, error: false})
      let services = [];
      if(this.state.foodChecked) {
        services.push("FOOD");
      }
      if(this.state.clothesChecked) {
        services.push("CLOTHES");
      }
      if(this.state.shelterChecked) {
        services.push("SHELTER");
      }
      const org = {
        name: this.state.name,
        description: this.state.description,
        position: this.state.position,
        address: this.state.address,
        services
      }
      const result = await HttpClient.post('organizations',org)
      this.setState({loaded: true, loading:false, error: false,})
    } catch(e) {
      console.log(e)
      this.setState({loaded: true, loading:false, error: true})
    }
  }

  render() {
    console.log('')
    const {classes} = this.props;
    return (
      <div style={{display:'flex', justifyContent: 'center'}}>
        <Paper style={{width: '60%', alignSelf: 'center'}}>
          <form style={{margin: '40px',}} >
            <div style={{alignSelf: 'center',marginHorizontal: 30, display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems:'center'}}>
              <h3 style={{textAlign: 'center'}}>Créer une organisation</h3>
              {this.state.error &&
                <div style={{backgroundColor: "#f44646",borderRadius: 10, borderWidth: 1,border: 'solid', borderColor: 'red', paddingLeft: 20, paddingRight: 20,width:'100%'}}>
                  <h5 style={{color:'white'}}>Un problème est survenu, veuillez réessayer plus tard</h5>
                </div>
              }
              {this.state.loaded && !this.state.loading && !this.state.error &&
                <div style={{backgroundColor: "#6fE09F",borderRadius: 10, borderWidth: 1,border: 'solid', borderColor: 'green', paddingLeft: 20, paddingRight: 20,width:'100%'}}>
                  <h5 style={{color:'white'}}>Enregistré</h5>
                </div>
              }
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

              <FormGroup style={{justifyContent: 'flex-start', alignItems: 'flex-start',width: '100%'}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.foodChecked}
                      onChange={this.handleCheckChange('foodChecked')}
                      value="checkedA"
                    />
                  }
                  label="Repas"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.clothesChecked}
                      onChange={this.handleCheckChange('clothesChecked')}
                      value="checkedB"
                    />
                  }
                  label="Vêtements"
                />
                <FormControlLabel control={
                  <Switch
                      checked={this.state.shelterChecked}
                      onChange={this.handleCheckChange('shelterChecked')}
                      value="checkedB"
                    />
                } label="Refuge" />
              </FormGroup>
              {!this.state.loading &&
                <Button variant="outlined" color="primary" onClick={this.submit} style={{width: '30%', marginTop: 20}}>
                  Enregistrer
                </Button>
              }
              {this.state.loading &&
                <CircularProgress className={classes.progress} />
              }

            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CreateOrg);