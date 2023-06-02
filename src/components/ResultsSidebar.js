import React, { useEffect, useState } from "react";
import InstagramVideo from "./InstagramVideo";
import placeData from "../data/places.json";
const ResultsSidebar = ({ selectedPlace, searchResults }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch(placeData)
      .then((response) => response.json())
      .then((data) => setPlaces(data))
      .catch((error) => {
        console.error("Error fetching places:", error);
      });
  }, []);

  return (
    <div className="results-sidebar">
      <div className="">
        <h1 className="text-secondary fs-2 me-3">Search Result: </h1>
        <h2 className="fs-4">
          {selectedPlace ? selectedPlace.name : "No Place Selected"}
        </h2>
      </div>
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
