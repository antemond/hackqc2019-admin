import React from 'react'
import { json as requestJson } from 'd3-request';
import JsonPath from '../../assets/ca-qc-quebec-neighborhoods.geojson'
import GoogleMap from './GoogleMap';
import HttpClient from '../services/HttpClient';
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import NeighborhoodDetail from './Map/NeighborhoodDetail';
import Neighborhood from '../domain/Neighborhood';

class Statistics extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      features: [],
      selectedNeighborhood: undefined,
    }
  }

  componentDidMount() {
    requestJson(JsonPath, (error, response) => {
      if (!error) {
        console.log(response.features);
        this.setState({ features: response.features })
      }
    });
  }

  fetchStatistics = async () => {
    try {
      const response = await HttpClient.get('statistics')
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  focusNeighbirhood = async (feature) => {
    const neighborhood = new Neighborhood(feature.properties);

    this.setState({ selectedNeighborhood: neighborhood })
    await this.fetchNeighborhood(neighborhood)
  }

  fetchNeighborhood = async (neighborhood: Neighborhood) => {
    try {
      this.setState({ fetching: true })
      const response = await HttpClient.get(`statistics?neighborhood=${encodeURI(neighborhood.name)}`)
      const updatedNeighborhood = this.state.selectedNeighborhood.update(response)
      this.setState({ fetching: false, selectedNeighborhood: updatedNeighborhood })
      console.log(response);
    } catch (e) {
      this.setState({ fetching: false })
      console.log(e);

    }
  }

  render() {
    const { selectedNeighborhood, fetching } = this.state;

    return (
      <div>
        <GoogleMap
          onNeighborhoodPress={this.focusNeighbirhood}
          features={this.state.features}
          selectedNeighborhood={this.state.selectedNeighborhood}
        />
        <InfoBox>
          <div>
            <span>bonjour</span>
          </div>
        </InfoBox>

        {selectedNeighborhood &&
          <NeighborhoodDetail fetching={fetching} neighborhood={selectedNeighborhood} />
        }
      </div>
    )
  }
}

export default Statistics