import React, { useState, useEffect } from "react";
import placesData from "../data/places.json";

const SearchBar = ({ onSelectPlace }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [originalResults, setOriginalResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setOriginalResults(placesData);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the places based on the search query
    const filteredResults = Object.entries(originalResults).reduce(
      (acc, [city, places]) => {
        const filteredPlaces = places.filter((place) =>
          place.toLowerCase().includes(query.toLowerCase())
        );
        if (filteredPlaces.length > 0) {
          acc.push({
            city,
            places: filteredPlaces,
          });
        }
        return acc;
      },
      []
    );

    setSearchResults(filteredResults);
  };

  const handleSelectPlace = (place) => {
    onSelectPlace(place);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      handleSelectPlace(searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a place..."
          />
          <button type="submit" className="btn btn-sm btn-secondary">
            Search
          </button>
        </div>
      </form>
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map(({ city, places }) => (
            <div key={city}>
              <strong>{city}</strong>
              <ul>
                {places.map((place) => (
                  <li key={place} onClick={() => handleSelectPlace(place)}>
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
