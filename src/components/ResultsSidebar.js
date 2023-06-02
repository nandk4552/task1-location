import React from "react";
import InstagramVideo from "./InstagramVideo";

const ResultsSidebar = ({ selectedPlace, searchResults }) => {
  const places =
    searchResults && searchResults.length > 0 ? searchResults[0].places : [];

  return (
    <div className="results-sidebar">
      <h3>{selectedPlace ? selectedPlace.name : "No Place Selected"}</h3>
      {places.length > 0 ? (
        <div className="results-list">
          {places.map((place) => (
            <div key={place.id} className="result-item">
              <InstagramVideo place={place} />
              <p>
                Distance: {place.distance} miles | Time:{" "}
                {formatTime(place.time)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No suitable place found</p>
      )}
    </div>
  );
};

// Helper function to format time in hours and minutes
const formatTime = (timeInMinutes) => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  return `${hours}h ${minutes}m`;
};

export default ResultsSidebar;
