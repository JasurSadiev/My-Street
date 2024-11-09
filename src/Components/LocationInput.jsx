import React, { useState } from "react";
import LocationIcon from "../assets/location.png"

function LocationInput() {
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // Function to detect location
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          console.error("Error detecting location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="relative w-full">
    <input
      type="text"
      className="border p-2 w-full pr-12" // Add padding-right to avoid overlap with the button
      placeholder="Enter location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
  
    <span
      onClick={detectLocation}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white rounded"
    >
      <img src={LocationIcon} alt="Detect Location" className="w-[24px]" />
    </span>
  </div>
  );
}

export default LocationInput;
