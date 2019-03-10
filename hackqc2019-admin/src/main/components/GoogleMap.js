import React from 'react'
import { compose, withProps } from "recompose"
import { withGoogleMap, GoogleMap, Polygon } from "react-google-maps"
import { Paper, Typography, CardHeader, Card, CircularProgress } from '@material-ui/core';

const COLOR = '#3f51b5'

const styles = {
  legend: {
    position: 'absolute',
    bottom: '20px',
    right: '15px',
    backgroundColor: '#FFFFFF',
    padding: '10px',
  }
}

function featureName(feature) {
  return feature.properties.NOM || feature.properties.Arrondissement
}

function GMap({ features, onNeighborhoodPress, selectedNeighborhood, stats }) {
  stats.sort((a, b) => {
    return a.donated - b.donated
  })

  const min = stats[0] ? stats[0].donated : 1
  const max = stats[stats.length - 1] ? stats[stats.length - 1].donated : 1

  return (
    <div style={{ position: 'relative' }}>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 46.810147, lng: -71.229253 }}
        options={{
          disableDefaultUI: true,
          fullscreenControl: false,
          mapTypeControl: false,

        }}
      >
        {features.map((feature) => {
          const featureStat = stats.find(s => s.name === featureName(feature))
          const fillColorOpacity = 0.4 * ((featureStat ? featureStat.donated : 0) / max) + 0.2
          if (feature.geometry.type === "Polygon") {
            return (
              <Polygon
                path={feature.geometry.coordinates[0].map(c => ({ lat: c[1], lng: c[0] }))}
                key={`${featureName(feature)}-${feature.properties.id || feature.properties.ID}`}
                options={{
                  fillColor: COLOR,
                  fillOpacity: fillColorOpacity,
                  strokeColor: COLOR,
                  strokeOpacity: 1,
                  strokeWeight: selectedNeighborhood && selectedNeighborhood.name === featureName(feature) ? 3 : 1
                }}
                onClick={() => {
                  onNeighborhoodPress(feature)
                }}
              />
            )
          }
          return mapMultiPolygon(feature).map((a, index) => {
            return (
              <Polygon
                paths={a}
                key={`${featureName(feature)}-${feature.properties.id || feature.properties.ID}-${index}`}
                options={{
                  fillColor: `rgb(63, 81, 181, ${Math.min(fillColorOpacity, 0.3)})`,
                  fillOpacity: selectedNeighborhood && selectedNeighborhood.name === featureName(feature) ? 0.6 : 0.4,
                  strokeColor: COLOR,
                  strokeOpacity: 1,
                  strokeWeight: selectedNeighborhood && selectedNeighborhood.name === featureName(feature) ? 3 : 1
                }}
                onClick={() => {
                  onNeighborhoodPress(feature)
                }}
              />
            )
          })
        })
        }
      </GoogleMap>

      <Card style={styles.legend}>
        <CardHeader
          title={<Typography variant="h6">Total des donations</Typography>}
          style={{ padding: 0, paddingBottom: 10 }}
        />
        {stats.length === 0 ?
          <CircularProgress color="primary" size={25} />
          :
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <span style={{ width: 40, marginRight: 10, textAlign: 'right' }}>{min}</span>
            <Paper
              style={{
                backgroundImage: 'linear-gradient(to right, rgb(63, 81, 181, 0.2), rgb(63, 81, 181, 0.8))',
                height: 20,
                width: 200,
              }}
            />
            <span style={{ width: 40, marginLeft: 10 }}>{max}</span>
          </div>
        }
      </Card>
    </div >
  )

  function mapMultiPolygon(feature) {
    return feature.geometry.coordinates.map(a => {
      return a.map(b => b.map(c => ({ lat: c[1], lng: c[0] })))
    });
  }
}

const mapEnvironement = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap
)

export default mapEnvironement(GMap)