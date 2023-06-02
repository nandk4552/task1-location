import React from "react";

const PlaceMarker = ({ place }) => {
  return (
    <div className="place-marker">
      <div className="place-name">{place.name}</div>
    </div>
  );
};

export default PlaceMarker;
