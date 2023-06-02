import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapContainer = ({ google, selectedPlace, searchResults }) => {
  const mapStyles = {
    width: "40%",
    height: "500px",
    overflow: "hidden",
  };

  return (
    <Map
      google={google}
      zoom={8}
      style={mapStyles}
      initialCenter={{ lat: 23.3324941, lng: 82.6124345 }}
      center={
        selectedPlace
          ? { lat: selectedPlace.latitude, lng: selectedPlace.longitude }
          : undefined
      }
    >
      {selectedPlace && (
        <Marker
          position={{
            lat: selectedPlace.latitude,
            lng: selectedPlace.longitude,
          }}
        />
      )}
      {searchResults &&
        searchResults.length > 0 &&
        searchResults.map(({ city, places }) =>
          places.map((place) => (
            <Marker
              key={place.name}
              position={{
                lat: place.latitude,
                lng: place.longitude,
              }}
            />
          ))
        )}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey,
})(MapContainer);
