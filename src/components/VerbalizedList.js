import React from "react";

const VerbalizedList = ({ searchResults }) => {
  return (
    <div className="verbalized-list">
      {searchResults.map(({ city, places }) => (
        <div key={city}>
          <h4>{city}</h4>
          <ul>
            {places.map((place) => (
              <li key={place.name}>
                {place.name} - {place.distance} ({place.time})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default VerbalizedList;
