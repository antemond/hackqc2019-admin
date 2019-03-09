import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


function SimpleMap(props) {
  console.log(props)
  return(
    <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lng:props.position.lat, lat: props.position.lon }}
    > 
    <Marker position={{ lat: props.position.lat, lng: props.position.lon }} />
  </GoogleMap>
  )
}

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCAhNWC3U7POGT523rKhxvAl30q6N0FgcQ",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap)((props) =>(
    <SimpleMap {...props} />
  )
);