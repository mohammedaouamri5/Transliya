import React, { Component, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYXppemtoYWxlZCIsImEiOiJjbHhobmsxM2UxYTRoMm5yMmNncng5c3doIn0.Ybgma2XqB2-Nfn-VvLkATQ";

const Mapp = () => {
  const map = useRef(null);

  return (
    <>
      <div>
        
      </div>
      <div></div>
    </>
  );
};

export default Mapp;
