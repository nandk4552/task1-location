import React, { useEffect, useState } from "react";
import InstagramVideo from "./InstagramVideo";
import placesData from "../data/places.json";

const ResultsSidebar = ({ selectedPlace, searchResults }) => {
  const [places, setPlaces] = useState([]);
  console.log(places);
  useEffect(() => {
    const selectedCity = searchResults[0]?.city || "";
    console.log("Selected City:", selectedCity);
    console.log("Places Data:", placesData);
    console.log("Selected Places:", placesData[selectedCity]);
    setPlaces(placesData[selectedCity] || []);
  }, [searchResults]);

  return (
    <div className="results-sidebar">
      <div className="">
        <h1
          className="fs-5 mb-3 text-bg-dark p-3 text-center text-uppercase"
          style={{ fontSize: "1rem" }}
        >
          Search Result:{" "}
        </h1>
        <h2 className="fs-5">
          {selectedPlace ? selectedPlace.name : "No Place Selected"}
        </h2>
      </div>

      {places?.length > 0 ? (
        <div className="results-list ">
          <h1 className="fs-5 text-bg-dark p-3 text-center text-uppercase">
            Suitable places
          </h1>
          {places?.map((place) => (
            <div key={place} className="result-item">
              <hr />
              {/* <InstagramVideo place={place} /> */}
              <p>Name: {place}</p>
              <p>
                Distance: {calculateDistance(place)} miles | Time:{" "}
                {calculateTime(place)}
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

// Helper function to calculate distance (dummy implementation)
const calculateDistance = (place) => {
  // Replace with your distance calculation logic
  return "10";
};

// Helper function to calculate time (dummy implementation)
const calculateTime = (place) => {
  // Replace with your time calculation logic
  return "1h 30m";
};

export default ResultsSidebar;
