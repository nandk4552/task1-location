import React, { useEffect, useState } from "react";
import InstagramVideo from "./InstagramVideo";
import placesData from "../data/places.json";
import Map from "./Map"; // Import the Map component

const ResultsSidebar = ({
  selectedPlace,
  searchResults,
  setSelectedPlace,
  handleSelectPlace,
}) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const selectedCity = searchResults[0]?.city || "";
    setPlaces(placesData[selectedCity] || []);
  }, [searchResults]);

  const handleClickPlace = (place) => {
    const selectedCity = searchResults[0]?.city || "";
    const selectedPlaceData = placesData[selectedCity]?.find(
      (data) => data === place
    );
    console.log(selectedPlaceData);
    if (selectedPlaceData) {
      handleUpdateSelectPlace(selectedPlaceData);
    } else {
      console.log(`Place not found: ${place}`);
    }
  };

  const calculateDistance = (place) => {
    // Replace with your distance calculation logic
    return "10";
  };

  const calculateTime = (place) => {
    // Replace with your time calculation logic
    return "1h 30m";
  };

  // handle update places
  const handleUpdateSelectPlace = async (place) => {
    try {
      const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        place
      )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(requestUrl);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const latitude = Number(location.lat);
        const longitude = Number(location.lng);

        if (!isNaN(latitude) && !isNaN(longitude)) {
          const selectedPlace = {
            name: place,
            latitude: latitude,
            longitude: longitude,
          };

          setSelectedPlace(selectedPlace);
        } else {
          console.log("Invalid coordinates for the selected place.");
        }
      } else {
        console.log("Unable to retrieve coordinates for the selected place.");
      }
    } catch (error) {
      console.error("Error retrieving coordinates:", error);
    }
  };

  return (
    <div className="results-sidebar">
      <div className="">
        <h1
          className="fs-5 mb-3 text-bg-dark p-3 text-center text-uppercase"
          style={{ fontSize: "1rem" }}
        >
          Search Result:
        </h1>
        <h2 className="fs-5">
          {selectedPlace ? selectedPlace.name : "No Place Selected"}
        </h2>
      </div>
      <h1 className="fs-5 text-bg-dark p-3 text-center text-uppercase">
        Suggested places
      </h1>
      {places?.length > 0 ? (
        <div className="results-list scrollable">
          {places?.map((place, index) => (
            <div
              key={index}
              className="result-item"
              onClick={() => handleClickPlace(place)}
            >
              <hr />
              <div className="map-item">
                <i class="fa-solid fa-map-pin mx-2"></i>
                <p className="mx-2">{place}</p>
              </div>
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

export default ResultsSidebar;
