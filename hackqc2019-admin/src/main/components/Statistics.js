import React from 'react'
import { json as requestJson } from 'd3-request';
import quebecPath from '../../assets/ca-qc-quebec-neighborhoods.geojson'
import GoogleMap from './GoogleMap';
import HttpClient from '../services/HttpClient';
import NeighborhoodDetail from './Map/NeighborhoodDetail';
import Neighborhood from '../domain/Neighborhood';
import NeighborhoodStat from '../domain/NeighborhoodStat';
import { Button, CircularProgress } from '@material-ui/core';

class Statistics extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      montreal: [],
      quebec: [],
      selectedNeighborhood: undefined,
      stats: [],
      loadingStats: false,
      errorStats: false
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

  downloadStats = async () => {
    try {
      this.setState({ errorStats: false, loadingStats: true })
      const result = await HttpClient.get('statistics', undefined);
      let filename = "export.json";
      let contentType = "application/json;charset=utf-8;";
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(result)))], { type: contentType });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        var a = document.createElement('a');
        a.download = filename;
        a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(result));
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.setState({ errorStats: false, loadingStats: false })
      }
    } catch (e) {
      this.setState({ errorStats: true, loadingStats: false })

    }
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }} onClick={() => this.downloadStats()}>

          {this.state.error &&
            <div style={{ backgroundColor: "#f44646", borderRadius: 10, borderWidth: 1, border: 'solid', borderColor: 'red', paddingLeft: 20, paddingRight: 20, width: '100%' }}>
              <h5 style={{ color: 'white' }}>Un problème est survenu, veuillez réessayer plus tard</h5>
            </div>
          }

          {this.state.loadingStats &&
            <CircularProgress />
          }
          {!this.state.loadingStats &&
            <Button color="primary" variant="outlined">
              Télécharger les statistiques par arrondissement (json)
          </Button>
          }
        </div>
      </div>
    )
  }
}

export default Statistics