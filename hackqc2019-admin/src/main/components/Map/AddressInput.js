// @flow
import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import type  { Coordinate } from '../domain/Establishment';
import { FormControl, InputLabel } from '@material-ui/core';


export type Field = {
  name: string,
  value: any,
}

type Props = {
  onSelect: (string, Coordinate) => void,
  onChange: (string) => void,
  onError: () => void,
  value: string,
};

type State = {
  showNoResult: boolean,
};

class AddressInput extends React.Component<Props, State> {

  state = {
    showNoResult: false,
  }

  findCoordinate = async (address: string) => {
    try {
      const results = await geocodeByAddress(address);
      const { lat, lng } = await getLatLng(results[0]);

      console.log({lat,lng})
    } catch (e) {
      console.log(e)
    }
  }

  onInputChange = (address: string) => {
    if (this.state.showNoResult) {
      this.setState({ showNoResult: false });
    }
    this.props.onChange(address);
  }

  render() {
    const {value} = this.props;

    return (
      <FormControl>
        <InputLabel>Address</InputLabel>
        
        <PlacesAutocomplete
          debounce={400}
          inputProps={{
            value: value,
            onChange: this.onInputChange,
            placeholder: 'Adresse',
          }}
          onError={() => this.setState({ showNoResult: true })}
          onSelect={this.findCoordinate}
          styles={{ autocompleteContainer: { zIndex: 10 } }}
        />
      </FormControl>
    );
  }

}

export default AddressInput;
