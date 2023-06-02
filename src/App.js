import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import MapContainer from "./components/Map";
import ResultsSidebar from "./components/ResultsSidebar";
import VerbalizedList from "./components/VerbalizedList";
import PlaceMarker from "./components/PlaceMarker";
import InstagramVideo from "./components/InstagramVideo";
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

  //     //* i got an error because i didnt have the api key of graph instagram i created a basic one but didnt work for me
  // const fetchInstagramVideos = async (placeName) => {
  //   try {
  //     const accessToken = process.env.REACT_APP_INSTA_API_KEY; // Replace with your Instagram API access token
  //     const instagramApiUrl = `https://graph.instagram.com/${placeName}/media?fields=id,media_type,media_url&access_token=${accessToken}`;

  //     const response = await fetch(instagramApiUrl);

  //     if (response.ok) {
  //       const data = await response.json();

  //       const videos = data.data.filter(
  //         (video) => video.media_type === "VIDEO"
  //       );

  //       const sidebarVideos = videos.map((video) => {
  //         return {
  //           id: video.id,
  //           url: video.media_url,
  //         };
  //       });

  //       setSidebarVideos(sidebarVideos);
  //     } else {
  //       throw new Error("Error retrieving Instagram videos");
  //     }
  //   } catch (error) {
  //     console.error("Error retrieving Instagram videos:", error);
  //   }
  // };

  //* dummy function
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
        <div className="container my-3 overflow-x-hidden">
          <div className="row">
            <div className="col-md-3">
              <SearchBar onSelectPlace={handleSelectPlace} />
            </div>
            <div className="col-md-6 overflow-scroll">
              <MapContainer
                selectedPlace={selectedPlace}
                searchResults={searchResults}
                highlightedPlace={highlightedPlace}
                onHoverPlace={handleHoverPlace}
                onClickPlace={handleClickPlace}
              />
              {selectedPlace && <PlaceMarker place={selectedPlace} />}
            </div>
            <div className="col-md-3 scrollable-sidebar">
              <ResultsSidebar
                selectedPlace={selectedPlace}
                searchResults={searchResults}
              >
                <div className="verbalized-list">
                  <VerbalizedList
                    searchResults={searchResults}
                    onHoverPlace={handleHoverPlace}
                    onClickPlace={handleClickPlace}
                  />
                </div>
                {sidebarVideos?.length > 0 ? (
                  <div className="instagram-videos">
                    {sidebarVideos?.map((video) => (
                      <InstagramVideo key={video.id} url={video.url} />
                    ))}
                  </div>
                ) : (
                  <div className="no-videos">No videos found</div>
                )}
              </ResultsSidebar>
              <div className="scrollable-content">
                Place your scrollable content here
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
