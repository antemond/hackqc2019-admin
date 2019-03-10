import React from 'react'
import { json as requestJson } from 'd3-request';
import quebecPath from '../../assets/ca-qc-quebec-neighborhoods.geojson'
import montrealPath from '../../assets/ca-qc-montreal-neighborhoods.json'
import GoogleMap from './GoogleMap';
import HttpClient from '../services/HttpClient';
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import NeighborhoodDetail from './Map/NeighborhoodDetail';
import Neighborhood from '../domain/Neighborhood';
import NeighborhoodStat from '../domain/NeighborhoodStat';

class Statistics extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      montreal: [],
      quebec: [],
      selectedNeighborhood: undefined,
      stats: []
    }
  }

  async componentDidMount() {
    this.fetchJSON(quebecPath, 'quebec');
    this.fetchJSON('https://s3.ca-central-1.amazonaws.com/hackqc2019/neighborhoods/ca-qc-montreal-neighborhoods.json', 'montreal')

    this.fetchStatistics()
  }

  fetchStatistics = async () => {
    try {
      const response = await HttpClient.get('statistics')

      this.setState({ stats: response.map(plain => new NeighborhoodStat(plain)) })
    } catch (e) {
      // Nothing to do
    }
  }

  focusNeighborhood = async (feature) => {
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
    } catch (e) {
      this.setState({ fetching: false })

    }
  }

  fetchJSON(path, name) {
    requestJson(path, (error, response) => {
      if (!error) {
        this.setState({ [name]: response.features });
      }
    });
  }

  render() {
    const { selectedNeighborhood, fetching, stats } = this.state;

    return (
      <div>
        <GoogleMap
          onNeighborhoodPress={this.focusNeighborhood}
          features={[...this.state.quebec, ...this.state.montreal]}
          selectedNeighborhood={this.state.selectedNeighborhood}
          neighborhoodStats={this.state.stats}
          stats={stats}
        />

        {selectedNeighborhood &&
          <NeighborhoodDetail
            fetching={fetching}
            neighborhood={selectedNeighborhood}
          />
        }
      </div>
    )
  }
}

export default Statistics