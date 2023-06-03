import React, { useState } from "react";
import placesData from "../data/places.json";
const SearchBar = ({ onSelectPlace }) => {
  const [selectedPlace, setSelectedPlace] = useState("");

  const handleSelect = (event) => {
    const selectedPlaceName = event.target.value;

    setSelectedPlace(selectedPlaceName);
    onSelectPlace(selectedPlaceName);
  };

  return (
    <select
      className="form-select form-select-md mx-auto"
      value={selectedPlace}
      onChange={handleSelect}
    >
      <option value="">Select a place</option>
      {Object.keys(placesData).map((placeName) => (
        <option key={placeName} value={placeName}>
          {placeName}
        </option>
      ))}
    </select>
  );
};

export default SearchBar;
