import { useRef, useEffect, useState } from "react";
import { Geocoder } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";

const MapboxComponent = () => {
  const accessToken =
    "pk.eyJ1IjoiYXppemtoYWxlZCIsImEiOiJjbHhobmsxM2UxYTRoMm5yMmNncng5c3doIn0.Ybgma2XqB2-Nfn-VvLkATQ";

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const startId = useRef(null);
  const endId = useRef(null);
  const [current, setcurrent] = useState();
  const [startPoint, setStartPoint] = useState(null);
  const [startGeo, setStartGeo] = useState();
  const [distance, setDistance] = useState()
  const [startPointText, setStartPointText] = useState("");
  const [endPointText, setEndPointText] = useState("");

  const [endPoint, setEndPoint] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const data = [longitude, latitude];
        setcurrent(data);
        console.log("Start Point set to current location:", data);

        if (data && mapContainerRef.current) {
          // Create the map instance
          mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: data,
            zoom: 13,
            style: "mapbox://styles/mapbox/streets-v11",
          });

          // Add navigation control
          mapInstanceRef.current.addControl(
            new mapboxgl.NavigationControl(),
            "top-left"
          );

          mapInstanceRef.current.addControl(
            new mapboxgl.GeolocateControl({
              positionOptions: {
                enableHighAccuracy: false,
              },
              trackUserLocation: true,
            }),
            "top-left"
          );

          // Handle map load
          mapInstanceRef.current.on("load", () => {
            setMapLoaded(true);
            console.log("Map loaded");

            const startPointGeocoder = new MapboxGeocoder({
              accessToken: accessToken,
              marker: true,
              placeholder: "أدخل نقطة البداية",
              flyTo: true,
              mapboxgl: mapboxgl,
            });

            const endPointGeocoder = new MapboxGeocoder({
              accessToken: accessToken,
              marker: true,
              placeholder: "أدخل نقطة النهاية",
              flyTo: true,
              mapboxgl: mapboxgl,
            });

            setStartGeo(startPointGeocoder);

            startPointGeocoder.on("result", (event) => {
              handleGeocoderSelection(event.result, "start");
            });

            endPointGeocoder.on("result", (event) => {
              handleGeocoderSelection(event.result, "end");
            });

            startPointGeocoder.addTo(startId.current);
            endPointGeocoder.addTo(endId.current);
          });

          return () => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.remove();
            }
          };
        }
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }, [accessToken]);

  useEffect(() => {
    const handleDirections = () => {
      if (startPoint && endPoint) {
        console.log("entered");
        const profile = "driving";
        const startCoords = `${startPoint[0]},${startPoint[1]}`;
        const endCoords = `${endPoint[0]},${endPoint[1]}`;
        const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${startCoords};${endCoords}?geometries=geojson&access_token=${accessToken}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.routes && data.routes.length > 0) {
              setDistance(data.routes[0].distance)
              const route = data.routes[0];
              const routeGeoJSON = {
                type: "Feature",
                geometry: route.geometry,
              };

              if (mapInstanceRef.current.getSource("directions-source")) {
                mapInstanceRef.current
                  .getSource("directions-source")
                  .setData(routeGeoJSON);
              } else {
                mapInstanceRef.current.addSource("directions-source", {
                  type: "geojson",
                  data: routeGeoJSON,
                });

                mapInstanceRef.current.addLayer({
                  id: "directions-route",
                  type: "line",
                  source: "directions-source",
                  layout: {
                    "line-join": "round",
                    "line-cap": "round",
                  },
                  paint: {
                    "line-color": "#3887be",
                    "line-width": 5,
                    "line-opacity": 0.75,
                  },
                });
              }

              // Update the map center to fit the route bounds
              const coordinates = route.geometry.coordinates;
              const bounds = coordinates.reduce(
                (b, coord) => b.extend(coord),
                new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
              );
              mapInstanceRef.current.fitBounds(bounds, { padding: 20 });

              console.log("Route added to map:", routeGeoJSON);
            } else {
              console.warn("No route found between these points");
            }
          })
          .catch((error) => console.error("Error fetching directions:", error));
      } else {
        console.warn("Please select both start and end points for directions");
      }
    };
    handleDirections();
  }, [startPoint, endPoint]);

  const handleGeocoderSelection = (selected, type) => {
    console.log(`Geocoder selected result for ${type}:`, selected);
    if (selected && selected.geometry && selected.geometry.coordinates) {
      const coordinates = selected.geometry.coordinates;

      if (type === "start") {
        setStartPoint(coordinates);
        console.log("Start Point set to:", coordinates);

        if (startMarkerRef.current) {
          startMarkerRef.current.remove();
        }

        startMarkerRef.current = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(mapInstanceRef.current);
        mapInstanceRef.current.flyTo({
          center: coordinates,
          zoom: 14,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      } else if (type === "end") {
        setEndPoint(coordinates);
        console.log("End Point set to:", coordinates);

        if (endMarkerRef.current) {
          endMarkerRef.current.remove();
        }

        endMarkerRef.current = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(mapInstanceRef.current);

        mapInstanceRef.current.flyTo({
          center: coordinates,
          zoom: 14,
          essential: true,
        });
      }
    } else {
      console.error(`Invalid selection object for ${type}:`, selected);
    }
  };

  const reverseLocation = (longitude, latitude) => {
    fetch(
      `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const address = data.features[0].properties.place_formatted;
          setStartPointText(address);
          startGeo.setInput(startPointText);
        } else {
          console.warn("Unable to get address from coordinates");
        }
      })
      .catch((error) => console.error("Error fetching address:", error));
  };

  const setCurrentLocationAsStartPoint = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseLocation(longitude, latitude);
        console.log("Start Point set to current location:", [
          longitude,
          latitude,
        ]);

        if (current) {
          setStartPoint(current);
          console.log("Start Point set to:", current);
          if (startMarkerRef.current) {
            startMarkerRef.current.remove();
          }
          startMarkerRef.current = new mapboxgl.Marker()
            .setLngLat(current)
            .addTo(mapInstanceRef.current);
          mapInstanceRef.current.flyTo({
            center: current,
            zoom: 14,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        }
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );

    if (startPointText) {
      startGeo.setInput(startPointText);
    }
  };

  const handleSubmit = () => {

  }

  return (
    <>
      <div className=" w-full bg-background p-12">
        <div className=" w-[90%] m-auto">
          <div className="text-end flex w-full justify-between">
            <div>
              <label className="block mb-2 text-lg font-medium mr-7 text-light ">
                الى
              </label>
              <div
                ref={endId}
                id="end-point-geocoder"
                className="w-auto p-2 text-background"
              ></div>
            </div>

            <div>
              <label className="block mb-2 mr-7 text-lg font-medium text-light ">
                من
              </label>
              <div className="flex items-center mb-5 ">
                <FaLocationArrow
                  className="text-xl cursor-pointer text-light hover:text-white duration-200"
                  onClick={setCurrentLocationAsStartPoint}
                />
                <div
                  ref={startId}
                  id="start-point-geocoder"
                  className="w-auto p-2"
                ></div>
              </div>
            </div>
          </div>

          <div
            id="map-container"
            ref={mapContainerRef}
            className="w-full h-[50vh]"
          ></div>

          <button className="w-full text-background bg-white hover:bg-light duration-300 text-lg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg my-5 px-5 py-2.5 text-center ">
            <Link to={"/bookingresults"}> إظهار النتائج </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default MapboxComponent;
