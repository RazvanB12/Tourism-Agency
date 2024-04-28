import React from "react";

const LocationBar = () => {
    const city = sessionStorage.getItem("city");
    const latitude = sessionStorage.getItem("latitude");
    const longitude = sessionStorage.getItem("longitude");

    return (
        <div className="location-bar">
            {city} - {latitude} - {longitude}
        </div>
    );
};

export default LocationBar;
