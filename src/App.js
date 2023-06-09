import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import MapContainer from "./components/Map";
import ResultsSidebar from "./components/ResultsSidebar";
import PlaceMarker from "./components/PlaceMarker";
import placesData from "./data/places.json";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [highlightedPlace, setHighlightedPlace] = useState(null);
  const [sidebarVideos, setSidebarVideos] = useState([]);

  useEffect(() => {
    // Fetch Instagram videos when a place is selected
    if (selectedPlace) {
      fetchInstagramVideos(selectedPlace.name);
    }
  }, [selectedPlace]);

  const handleSelectPlace = async (place) => {
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
          setSearchResults([
            {
              city: place,
              places: placesData[place] || [],
            },
          ]);
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

  const handleHoverPlace = (place) => {
    setHighlightedPlace(place);
  };

  const handleClickPlace = (place) => {
    setSelectedPlace(place);
    fetchInstagramVideos(place.name);
  };

  const fetchInstagramVideos = async (placeName) => {
    try {
      // Replace with your dummy data
      const dummyData = [
        {
          id: "1",
          media_type: "VIDEO",
          media_url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
        },
        {
          id: "2",
          media_type: "VIDEO",
          media_url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
        },
      ];

      const videos = dummyData.filter((video) => video.media_type === "VIDEO");

      const sidebarVideos = videos.map((video) => {
        return {
          id: video.id,
          url: video.media_url,
        };
      });

      setSidebarVideos(sidebarVideos);
    } catch (error) {
      console.error("Error retrieving Instagram videos:", error);
    }
  };

  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh" }}>
        <div className="container my-3">
          <div className="row">
            <div className="col-md-3  my-3">
              <h1 className="fs-5 text-bg-dark p-3 text-center text-uppercase">
                Search
              </h1>
              <SearchBar onSelectPlace={handleSelectPlace} />
            </div>
            <div className="col-md-6 position-relative my-3">
              <h1 className="fs-5 mb-3 text-bg-dark p-3 text-center text-uppercase">
                Maps
              </h1>
              <MapContainer
                selectedPlace={selectedPlace}
                searchResults={searchResults}
                highlightedPlace={highlightedPlace}
                onHoverPlace={handleHoverPlace}
                onClickPlace={handleClickPlace}
              >
                {/* Render PlaceMarker for each place */}
                {searchResults.map((result) =>
                  result.places.map((place) => (
                    <PlaceMarker key={place.id} place={place} />
                  ))
                )}
              </MapContainer>
              {selectedPlace && <PlaceMarker place={selectedPlace} />}
            </div>
            <div className="col-md-3  my-3">
              <ResultsSidebar
                className
                setSelectedPlace={setSelectedPlace}
                selectedPlace={selectedPlace}
                searchResults={searchResults}
                handleSelectPlace={handleSelectPlace}
              ></ResultsSidebar>
              <div className=" my-3">
                <h1 className="fs-5 mb-3 text-bg-dark p-3 text-center text-uppercase">
                  Scrollable text
                </h1>
                <div className="results-list scrollable">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut,
                  dolor exercitationem provident voluptate labore maiores
                  dolorem rem, debitis nisi quasi natus iure ea quisquam non
                  tenetur eius suscipit. Maxime cupiditate soluta ipsam itaque,
                  illum excepturi porro dolorem maiores molestias possimus
                  perspiciatis illo ducimus adipisci, omnis aspernatur autem
                  fuga provident quisquam! Dolore optio corrupti aliquam
                  quisquam commodi at itaque laudantium deserunt ad magni,
                  dolorem fugit inventore ut? Magni, rerum placeat saepe impedit
                  quia dolorum. Officia eos dolor qui suscipit nihil vel a quia.
                  Vitae iure distinctio inventore amet, a omnis harum neque aut.
                  Harum, quibusdam dolores molestiae sunt accusamus nam minima?{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
