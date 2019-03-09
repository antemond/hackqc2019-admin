import React from 'react'
import { compose, withProps } from "recompose"
import { withGoogleMap, GoogleMap, Polygon } from "react-google-maps"
import { Paper, Typography } from '@material-ui/core';

const styles = {
  legend: {
    position: 'absolute',
    bottom: '20px',
    right: '15px',
    backgroundColor: '#FFFFFF',
    padding: '10px',
  }
}

function GMap({ features, onNeighborhoodPress, selectedNeighborhood }) {
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
        {features.map((feature) => (
          <Polygon
            path={feature.geometry.coordinates[0].map(c => ({ lat: c[1], lng: c[0] }))}
            key={feature.properties.NOM}
            options={{
              fillColor: "#000",
              fillOpacity: selectedNeighborhood && selectedNeighborhood.name === feature.properties.NOM ? 0.6 : 0.4,
              strokeColor: "#000",
              strokeOpacity: 1,
              strokeWeight: selectedNeighborhood && selectedNeighborhood.name === feature.properties.NOM ? 3 : 1
            }}
            onClick={() => {
              onNeighborhoodPress(feature)
            }} />
        ))
        }
      </GoogleMap>

      <Paper style={styles.legend}>
        <Typography component="p">
          Legende
        </Typography>
        <Paper style={{
          backgroundImage: 'linear-gradient(to right, rgb(63, 81, 181, 0.2), #3f51b5)',
          height: 20,
          width: 200,
        }}>

        </Paper>
      </Paper>
    </div >
  )
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